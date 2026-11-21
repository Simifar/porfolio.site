"""Model and render Relay, an original desktop-repair collectible.

From the repository root, with Blender 4.3+ and ImageMagick on PATH:
    blender -b -t 3 -P scripts/art/build-relay.py

The turntable starts at the front three-quarter pose and orbits 45 degrees
per image. The GLB contains the same meshes and materials in their rest pose.
For a quick proof:
    blender -b -t 3 -P scripts/art/build-relay.py -- --views 0 --size 420 --samples 8 --out /tmp/relay
"""
import argparse
import math
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile

import bmesh
import bpy
from mathutils import Vector


def options():
    args = argparse.ArgumentParser(description=__doc__)
    args.add_argument("--views", type=int, choices=range(8), nargs="+", default=list(range(8)))
    args.add_argument("--size", type=int, default=640)
    args.add_argument("--samples", type=int, default=112)
    args.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[2] / "public/figures/relay")
    args.add_argument("--skip-glb", action="store_true")
    args.add_argument("--glb-only", action="store_true")
    return args.parse_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])


def linear(channel):
    channel = int(channel, 16) / 255
    return channel / 12.92 if channel <= 0.04045 else ((channel + 0.055) / 1.055) ** 2.4


def tone(hex_color):
    return (*[linear(hex_color[i:i + 2]) for i in (0, 2, 4)], 1)


def material(name, color, rough=.38, metal=0, coat=0, glow=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = tone(color)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    for key, val in {
        "Base Color": tone(color), "Metallic": metal, "Roughness": rough,
        "Coat Weight": coat, "Coat Roughness": .20,
        "Emission Color": tone(color), "Emission Strength": glow,
    }.items():
        shader.inputs[key].default_value = val
    return mat


bpy.ops.wm.read_factory_settings(use_empty=True)

ivory = material("Ivory | ceramic enamel", "FFF0C7", .32, .06, .27)
cream = material("Warm biscuit | inner moulding", "DEB47F", .40, .07)
sun = material("Marigold | enamel", "FFAD25", .29, .09, .28)
orange = material("Tangerine | enamel", "F36A20", .33, .07, .19)
burnt = material("Sienna | rubber trim", "AD4124", .43)
ink = material("Midnight | rubber gasket", "20213F", .43)
joint = material("Plum charcoal | joint bellows", "393150", .4, .15)
plum = material("Indigo | twill", "54459A", .56)
violet = material("Iris | twill highlights", "8261CE", .48)
denim = material("Ultramarine | fabric bindings", "413378", .53)
lilac = material("Wisteria | twill piping", "AE8AE7", .42)
glove = material("Burnished amber | work gloves", "DA7427", .43, .04)
pad = material("Honey | finger protectors", "FFA63B", .37, .04, .08)
steel = material("Blue steel | anodised edge", "6C97AE", .31, .54)
alloy = material("Ice alloy | bead blasted", "B0D9DC", .26, .52)
teal = material("Cerulean | hard rubber", "228E9B", .34, .16)
mint = material("Mint | live phosphor", "3CFFCE", .32, .01, .06, .73)
light_mint = material("Mint white | phosphor core", "A4FFE5", .31, .02, .08, .53)
dim_mint = material("Lagoon | glass markings", "39A4AD", .32, .18, .10)
screen = material("Petrol | curved screen glass", "103542", .20, .25, .46)
glass_edge = material("Petrol | glass perimeter", "205263", .28, .22, .35)
iris = material("Deep teal | eyes", "096575", .36, .04, .05)
glint = material("Soft blue | etched reflections", "478192", .20, .22, .43)
brass = material("Pale brass | fasteners", "F7BE64", .29, .55)
light = material("Orange red | pilot light", "FF733D", .27, .07, .35, .46)

parts = []
groups = []


def assembly(name, pos=(0, 0, 0), angles=(0, 0, 0), parent=None):
    obj = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(obj)
    obj.empty_display_type = "PLAIN_AXES"
    obj.empty_display_size = .12
    obj.location = pos
    obj.rotation_euler = tuple(map(math.radians, angles))
    obj.parent = parent
    groups.append(obj)
    return obj


def attach(obj, name, mat, parent):
    obj.name = name
    obj.data.name = name
    obj.data.materials.append(mat)
    obj.parent = parent
    parts.append(obj)
    return obj


def mesh(name, vertices, faces, mat, parent, smooth=True):
    data = bpy.data.meshes.new(name)
    data.from_pydata(vertices, [], faces)
    data.update()
    bm = bmesh.new()
    bm.from_mesh(data)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(data)
    bm.free()
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    for face in data.polygons:
        face.use_smooth = smooth
    return attach(obj, name, mat, parent)


def loops_mesh(name, rings, mat, parent, smooth=True):
    count = len(rings[0])
    faces = [tuple(reversed(range(count)))]
    for row in range(len(rings) - 1):
        base = row * count
        for i in range(count):
            j = (i + 1) % count
            faces.append((base + i, base + j, base + count + j, base + count + i))
    faces.append(tuple(range((len(rings) - 1) * count, len(rings) * count)))
    obj = mesh(name, [v for ring in rings for v in ring], faces, mat, parent, smooth)
    obj.data.polygons[0].use_smooth = obj.data.polygons[-1].use_smooth = False
    return obj


def rnd_rect(width, height, radius, steps=6):
    hw, hh = width / 2, height / 2
    radius = min(radius, hw * .999, hh * .999)
    coords = []
    corners = [(hw-radius, hh-radius, 0), (-hw+radius, hh-radius, 90),
               (-hw+radius, -hh+radius, 180), (hw-radius, -hh+radius, 270)]
    for cx, cy, degrees in corners:
        for i in range(steps + 1):
            a = math.radians(degrees + 90 * i / steps)
            coords.append((cx + radius * math.cos(a), cy + radius * math.sin(a)))
    return coords


def shell(name, profiles, mat, parent):
    # Each nested rectangle is a section of the mould, cut perpendicular to Y.
    rings = [[(x, y, z + lift) for x, z in rnd_rect(w, h, r)]
             for y, w, h, r, lift in profiles]
    return loops_mesh(name, rings, mat, parent)


def z_shell(name, profiles, mat, parent):
    rings = [[(x + cx, y + cy, z) for x, y in rnd_rect(w, d, rad, 4)]
             for z, w, d, rad, cx, cy in profiles]
    return loops_mesh(name, rings, mat, parent)


def round_edges(obj, radius, seg=3):
    if radius:
        mod = obj.modifiers.new("Rounded mould edge", "BEVEL")
        mod.width = radius
        mod.segments = seg
        mod.limit_method = "ANGLE"
        mod.harden_normals = True
        normals = obj.modifiers.new("Plane normals", "WEIGHTED_NORMAL")
        normals.keep_sharp = True
        normals.weight = 50
    return obj


def box(name, pos, dims, radius, mat, parent, angles=(0, 0, 0), seg=3):
    x, y, z = (v / 2 for v in dims)
    vertices = [(a, b, c) for c in (-z, z) for b in (-y, y) for a in (-x, x)]
    faces = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (1, 5, 7, 3),
             (3, 7, 6, 2), (2, 6, 4, 0)]
    obj = mesh(name, vertices, faces, mat, parent, False)
    obj.location = pos
    obj.rotation_euler = tuple(map(math.radians, angles))
    return round_edges(obj, radius, seg)


def silhouette(name, outline, pos, depth, radius, mat, parent, angles=(0, 0, 0)):
    rings = [[(x, y, z) for x, z in outline] for y in (-depth/2, depth/2)]
    obj = loops_mesh(name, rings, mat, parent, False)
    obj.location = pos
    obj.rotation_euler = tuple(map(math.radians, angles))
    return round_edges(obj, radius, 3)


def capsule(name, pos, dims, mat, parent, angles=(0, 0, 0), segments=20):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=12)
    obj = bpy.context.object
    obj.location = pos
    obj.scale = tuple(a / 2 for a in dims)
    obj.rotation_euler = tuple(map(math.radians, angles))
    for face in obj.data.polygons:
        face.use_smooth = True
    return attach(obj, name, mat, parent)


def lathe(name, rows, mat, parent, sides=24, power=1):
    rings = []
    for z, rx, ry, cx, cy in rows:
        ring = []
        for i in range(sides):
            a = 2 * math.pi * i / sides
            c, s = math.cos(a), math.sin(a)
            ring.append((cx + rx*math.copysign(abs(c)**power, c),
                         cy + ry*math.copysign(abs(s)**power, s), z))
        rings.append(ring)
    return loops_mesh(name, rings, mat, parent)


def shaft(name, start, end, profile, mat, parent, sides=24, aspect=1):
    axis = Vector(end) - Vector(start)
    obj = lathe(name, [(axis.length * t, r, r * aspect, 0, 0) for t, r in profile], mat, parent, sides)
    obj.location = start
    obj.rotation_euler = axis.to_track_quat("Z", "Y").to_euler()
    return obj


def drum(name, a, b, r, mat, parent, sides=28):
    return shaft(name, a, b, [(0, .88*r), (.09, r), (.20, r), (.80, r), (.91, r), (1, .88*r)], mat, parent, sides)


def line(name, pts, radius, mat, parent, resolution=5):
    # Convert the modelled bezier immediately so the exported GLB has the same cable.
    data = bpy.data.curves.new(name, "CURVE")
    data.dimensions = "3D"
    data.resolution_u = resolution
    data.bevel_depth = radius
    data.bevel_resolution = 2 if radius >= .033 else 1
    data.use_fill_caps = True
    spline = data.splines.new("BEZIER")
    spline.bezier_points.add(len(pts) - 1)
    for bp, point in zip(spline.bezier_points, pts):
        bp.co = point
        bp.handle_left_type = bp.handle_right_type = "AUTO"
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.convert(target="MESH")
    obj.select_set(False)
    return attach(obj, name, mat, parent)


def ribbon(name, path, width, thickness, mat, parent):
    rings = []
    for x, y, z in path:
        rings.append([(x-width/2, y-thickness/2, z), (x+width/2, y-thickness/2, z),
                      (x+width/2, y+thickness/2, z+.012), (x-width/2, y+thickness/2, z+.012)])
    return round_edges(loops_mesh(name, rings, mat, parent, False), .017, 2)


relay = assembly("RELAY | bench technician")
relay["character"] = "Relay / Реле"
relay["equipment"] = "Insulated spanner, field-service backpack and CRT diagnostics"
relay["model"] = "Original procedural sculpture for Egor Matafonov's portfolio"
body = assembly("01 | Mechanic coveralls", parent=relay)
head = assembly("02 | CRT display housing", (0, -.025, 2.93), (-3, -7, 1), relay)
pack = assembly("03 | Field service cassette", (.04, .49, 1.73), (2, 4, -3), relay)

# A broad, stepped monitor bezel meets a tapered yellow rear enclosure.
shell("Head | tangerine mould seam", [
    (-.35, 1.98, 1.39, .31, 0), (-.29, 2.045, 1.43, .32, 0),
    (.20, 1.99, 1.40, .32, .01), (.46, 1.80, 1.28, .31, .025),
    (.63, 1.61, 1.14, .27, .035), (.67, 1.50, 1.03, .24, .035)], orange, head)
shell("Head | cast gold back", [
    (-.24,2.035,1.415,.32,0), (-.17,2.052,1.43,.32,0),
    (.12,2.035,1.42,.33,.007), (.37,1.92,1.37,.33,.014),
    (.56,1.72,1.24,.29,.03), (.68,1.54,1.08,.26,.04),
    (.71,1.46,1.01,.24,.04)], sun, head)
shell("Head | buttermilk front casting", [
    (-.710,1.82,1.30,.29,0),(-.699,1.91,1.36,.305,0),
    (-.655,1.99,1.425,.320,0),(-.58,2.045,1.47,.33,0),
    (-.46,2.064,1.48,.335,0),(-.31,2.064,1.474,.335,0),
    (-.265,2.048,1.455,.332,0),(-.248,2.025,1.425,.321,0)], ivory, head)
shell("Display | warm stepped surround", [
    (-.706,1.84,1.202,.267,.051),(-.725,1.805,1.173,.26,.051),
    (-.750,1.735,1.10,.253,.060)], cream, head)
shell("Display | recessed rubber seat", [
    (-.728,1.758,1.126,.263,.062),(-.756,1.735,1.112,.258,.064),
    (-.776,1.672,1.045,.251,.068)], ink, head)
shell("Display | blue edge seal", [
    (-.759,1.681,1.054,.25,.07),(-.785,1.659,1.037,.247,.07),
    (-.782,1.614,.988,.246,.07)], glass_edge, head)

screen_center = .072
lens_w, lens_h = 1.627, 1.015


def glass_y(x, z):
    return -.895 + .068*(x / (lens_w/2))**2 + .038*((z-screen_center) / (lens_h/2))**2


perimeter = rnd_rect(lens_w, lens_h, .249, 8)
lens_rings = [[(x, -.755, z+screen_center) for x, z in perimeter]]
for scale in (1, .962, .84, .68, .50, .32, .14, .025):
    lens_rings.append([(x*scale, glass_y(x*scale, z*scale+screen_center), z*scale+screen_center)
                       for x,z in perimeter])
loops_mesh("Display | convex smoked picture tube", lens_rings, screen, head)


def decal(name, outline, mat, offset=.009):
    # Subdivide the planar face before projecting it onto the convex tube.
    # The decals follow the glass at every angle.
    points = [(x, 0, z) for x, z in outline]
    data = bpy.data.meshes.new(name)
    bm = bmesh.new()
    vertices = [bm.verts.new(p) for p in points]
    face = bm.faces.new(vertices)
    bmesh.ops.triangulate(bm, faces=[face])
    bmesh.ops.subdivide_edges(bm, edges=list(bm.edges), cuts=2, use_grid_fill=True)
    for vert in bm.verts:
        vert.co.y = glass_y(vert.co.x, vert.co.z) - offset
    bm.normal_update()
    for poly in bm.faces:
        if poly.normal.y > 0:
            poly.normal_flip()
        poly.smooth = True
    bm.to_mesh(data)
    bm.free()
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    return attach(obj, name, mat, head)


def glass_mark(name, x, z, w, h, rad, mat, angle=0):
    a = math.radians(angle)
    coords = [(x+px*math.cos(a)-pz*math.sin(a), z+px*math.sin(a)+pz*math.cos(a))
              for px,pz in rnd_rect(w,h,rad,5)]
    return decal(name, coords, mat, .018 if mat is iris else .025 if mat is light_mint else .009)


# Two asymmetric eye shutters and an upturned phosphor smile.
eye_points = [(-.133,.03),(-.134,.136),(-.122,.182),(-.087,.209),
              (-.033,.214),(.090,.186),(.129,.156),(.137,.109),
              (.128,-.050),(.102,-.125),(.052,-.153),(-.029,-.152),
              (-.092,-.125),(-.123,-.070)]
decal("Face | attentive eye", [(x-.314,z+.117) for x,z in eye_points], mint)
decal("Face | lifted eye", [(-x*.92+.322,z*.86+.146) for x,z in reversed(eye_points)], mint)
# The two eyes look slightly towards the raised spanner.
glass_mark("Face | attentive pupil", -.343,.145,.080,.139,.035,iris,-7)
glass_mark("Face | lifted pupil", .287,.160,.077,.121,.033,iris,-4)
glass_mark("Face | left phosphor catch", -.354,.204,.043,.030,.013,light_mint,-7)
glass_mark("Face | right phosphor catch", .276,.208,.041,.029,.014,light_mint,8)
smile = [(-.142,-.118),(-.112,-.119),(-.068,-.146),(-.008,-.156),
         (.059,-.143),(.120,-.104),(.148,-.108),(.152,-.130),
         (.091,-.191),(.018,-.216),(-.056,-.213),(-.110,-.181),(-.148,-.144)]
decal("Face | crooked grin", smile, mint)
for side in (-1,1):
    for j in range(2):
        glass_mark("Face | cheek phosphor", side*(.497+j*.065), -.084+j*.011, .039,.078,.018, dim_mint,-23)
glass_mark("Glass | long diagonal glint", -.524,.425,.24,.022,.011,glint,5)
glass_mark("Glass | short diagonal glint", -.349,.441,.048,.017,.008,glint,5)
glass_mark("Glass | lower reflection", .569,-.301,.138,.014,.007,glint,7)

# Fine moulded features only on the casing surround, clear of the expression.
for i in range(3):
    box("Bezel | speaker vent",(-.56+i*.105,-.705,-.578),(.066,.026,.029),.013,cream,head,seg=2)
box("Bezel | power indicator well",(.49,-.705,-.538),(.187,.032,.061),.025,cream,head)
box("Bezel | mint power lamp",(.485,-.726,-.538),(.119,.024,.025),.010,mint,head)
for x in (-.73,.72):
    drum("Bezel | bottom captive fastener",(x,-.686,-.50),(x,-.708,-.50),.026,brass,head,16)

# The headset receiver reads on the hero side. The other side has a smaller service port.
for side in (-1,1):
    sign = side
    yy = -.033
    zz = .004
    drum("Head | ear socket",(sign*.91,yy,zz),(sign*1.055,yy,zz),.324,ink,head,36)
    drum("Head | receiver gold band",(sign*1.035,yy,zz),(sign*1.113,yy,zz),.302,orange,head,36)
    drum("Head | receiver dial",(sign*1.09,yy,zz),(sign*1.154,yy,zz),.245,ivory,head,32)
    drum("Head | dial inset",(sign*1.141,yy,zz),(sign*1.166,yy,zz),.166,cream,head,32)
    for j in range(3):
        zz2 = zz+(j-1)*.067
        box("Head | receiver grille",(sign*1.172,yy,zz2),(.017,.177 if j==1 else .133,.033),
            .010,ink,head,(0,0,0),2)
    for j in range(3):
        box("Head | shell breather",(side*(1.017-j*.018),.088+j*.100,.427),
            (.027,.034,.245),.011,burnt,head,(0,-sign*9,0),2)

# Recessed back door and air register.
shell("Head | rear inspection bevel", [
    (.662,1.40,.94,.19,.055),(.700,1.41,.94,.19,.055),(.738,1.34,.87,.16,.055)], orange, head)
shell("Head | cream inspection door", [
    (.725,1.32,.855,.163,.055),(.751,1.31,.84,.16,.055),(.766,1.25,.79,.145,.055)], cream, head)
box("Head | vent cavity",(0,.773,.095),(.866,.037,.415),.10,burnt,head)
for j in range(4):
    box("Head | rear louvres",(0,.814,.228-j*.09),(.805,.092,.041),.017,ivory,head,(-12,0,0),2)
for xx in (-.536,.536):
    for zz in (-.222,.32):
        drum("Head | service screw",(xx,.763,zz),(xx,.783,zz),.034,brass,head,18)
        box("Head | screw slot",(xx,.785,zz),(.038,.008,.007),.002,burnt,head,(0,25,0),2)

# Short offset aerial and lift handle break the top line without hiding the head.
for xx in (-.31,.345):
    box("Crown | handle foot",(xx,-.055,.710),(.177,.238,.109),.041,orange,head)
line("Crown | carry handle", [(-.31,-.055,.731),(-.302,-.055,.861),(-.228,-.055,.914),
                              (.212,-.055,.914),(.328,-.055,.866),(.345,-.055,.746)],
     .071,ink,head,5)
line("Crown | padded grip", [(-.186,-.055,.918),(0,-.055,.925),(.171,-.055,.918)],.080,denim,head)
for xx in (-.100,0,.100):
    box("Crown | grip ribs",(xx,-.052,.926),(.017,.162,.138),.008,violet,head,seg=2)
shaft("Aerial | base",(-.666,.116,.657),(-.685,.119,.772),
      [(0,.115),(.18,.132),(.65,.124),(.83,.113),(1,.088)],burnt,head)
shaft("Aerial | knuckle",(-.677,.12,.741),(-.721,.128,.834),
      [(0,.081),(.3,.101),(.65,.096),(1,.066)],brass,head)
shaft("Aerial | telescoping stalk",(-.707,.128,.809),(-.873,.157,1.061),
      [(0,.043),(.65,.036),(.68,.030),(1,.027)],steel,head,16)
capsule("Aerial | amber tip",(-.88,.158,1.079),(.164,.164,.171),light,head,segments=20)

# The shirt and bib have distinct shoulder, waist, hip and pocket profiles.
lathe("Body | golden jacket",[
    (1.20,.46,.32,0,0),(1.25,.56,.39,0,0),(1.35,.621,.425,0,0),
    (1.59,.652,.435,0,0),(1.83,.692,.409,0,.006),(1.98,.673,.377,0,.012),
    (2.08,.545,.324,0,.022),(2.16,.363,.244,0,.023),(2.17,.262,.194,0,.025)],
    sun,body,32,.84)
lathe("Body | heavy overall waist",[
    (.93,.421,.335,0,.021),(1.01,.556,.382,0,.015),(1.14,.637,.440,0,.003),
    (1.37,.664,.465,0,0),(1.51,.650,.454,0,0),(1.59,.608,.427,0,0),
    (1.63,.545,.37,0,0)],plum,body,32,.85)
lathe("Body | neck bellows",[(2.082,.28,.215,0,0),(2.105,.313,.234,0,0),(2.16,.295,.227,0,0),
    (2.19,.248,.204,0,0),(2.22,.266,.212,0,0),(2.31,.24,.19,0,0),(2.35,.196,.17,0,0)],ink,body)
lathe("Body | neck trim",[(2.195,.258,.211,0,0),(2.207,.272,.225,0,0),(2.233,.271,.224,0,0),
    (2.242,.253,.205,0,0)],steel,body)
bib_outline=[(-.459,-.20),(-.442,.05),(-.392,.13),(-.362,.248),(-.29,.272),
             (.287,.272),(.363,.244),(.389,.128),(.453,.039),(.466,-.20),
             (.393,-.270),(-.374,-.272)]
silhouette("Overalls | reinforced front bib",bib_outline,(0,-.408,1.641),.081,.037,violet,body,(-4,0,0))
for s in (-1,1):
    path=[(s*.411,.339,1.61),(s*.466,.291,1.954),(s*.455,.130,2.068),
          (s*.412,-.082,2.087),(s*.382,-.266,2.022),(s*.343,-.405,1.878)]
    ribbon("Overalls | suspender webbing",path,.145,.052,denim,body)
    line("Overalls | strap edge",[(x+s*.042,y-.013,z+.019) for x,y,z in path],.012,lilac,body,3)
    drum("Overalls | brass button",(s*.341,-.432,1.859),(s*.341,-.475,1.859),.065,brass,body,24)
    drum("Overalls | button inset",(s*.341,-.473,1.859),(s*.341,-.482,1.859),.031,burnt,body,16)
pocket=[(-.278,.112),(-.235,.151),(.239,.151),(.278,.112),(.263,-.081),
        (.196,-.148),(-.133,-.162),(-.234,-.111)]
silhouette("Overalls | front patch pocket",pocket,(0,-.466,1.602),.061,.027,plum,body,(-5,0,0))
line("Overalls | pocket piping",[(-.236,-.503,1.682),(0,-.504,1.673),(.235,-.504,1.683)],.014,lilac,body)
badge=assembly("Overalls | relay badge",(.016,-.516,1.572),(0,-5,0),body)
box("Badge | enamel backing",(0,0,0),(.192,.041,.152),.034,ivory,badge)
pulse=[(-.074,-.006),(-.043,-.006),(-.023,.041),(-.002,.041),(.012,-.011),
       (.023,.010),(.070,.010),(.070,-.010),(.036,-.010),(.016,-.042),
       (-.006,-.042),(-.020,.009),(-.032,-.025),(-.074,-.025)]
silhouette("Badge | test pulse",pulse,(0,-.025,0),.008,.002,teal,badge)
lathe("Overalls | belt",[(1.194,.632,.435,0,0),(1.213,.655,.453,0,0),
    (1.312,.665,.468,0,0),(1.328,.649,.448,0,0)],ink,body,32,.83)
box("Belt | die-cast buckle",(-.077,-.462,1.269),(.267,.081,.145),.036,brass,body,(0,-3,0))
box("Belt | indigo insert",(-.077,-.509,1.269),(.149,.025,.073),.014,joint,body,(0,-3,0))
for s in (-1,1):
    box("Overalls | belt keeper",(s*.368,-.391,1.266),(.078,.076,.182),.023,violet,body,(0,s*6,s*15))
box("Belt | service pouch",(.579,-.204,1.277),(.240,.245,.343),.064,burnt,body,(1,-10,13))
box("Belt | pocket flap",(.585,-.327,1.353),(.235,.054,.126),.032,orange,body,(1,-10,13))

# Substantial short trouser legs and boots, each planted at a different angle.
for side, word in [(-1,"Left"),(1,"Right")]:
    x=side
    foot_x = -.630 if side == -1 else .565
    foot=assembly("04 | "+word+" safety boot",(foot_x, -.242 if side==-1 else .130, 0),
                  (0,0,-21 if side==-1 else 14),relay)
    foot.scale = (1.09, 1.09, 1.04)
    leg_a=(foot_x, -.112 if side==-1 else .150, .332)
    leg_b=(side*.360, .022, 1.172)
    shaft(word+" | folded trouser leg",leg_a,leg_b,[(0,.207),(.055,.241),(.14,.266),(.21,.272),
        (.26,.24),(.30,.255),(.43,.276),(.57,.288),(.80,.304),(.92,.286),(1,.224)],plum,body,24,.99)
    patch=assembly(word+" | knee", (side*(.539 if side==-1 else .498), -.285 if side==-1 else -.124, .708),(-9,side*-7,side*8),body)
    box(word+" | knee patch",(0,0,0),(.372,.129,.267),.081,denim,patch)
    for j in (-1,1):
        box(word+" | knee reinforcement",(0,-.069,j*.042),(.244,.025,.021),.008,violet,patch,seg=2)
    z_shell(word+" | rubber outsole",[
        (.008,.593,.841,.141,0,-.077),(.026,.686,.960,.172,0,-.065),
        (.070,.723,1.001,.183,0,-.066),(.125,.718,.993,.176,0,-.062),
        (.153,.696,.966,.168,0,-.063)],ink,foot)
    z_shell(word+" | ochre welt",[(.104,.716,.990,.179,0,-.063),
        (.122,.725,.996,.180,0,-.063),(.162,.709,.977,.175,0,-.059),(.173,.675,.944,.171,0,-.057)],sun,foot)
    z_shell(word+" | boot upper",[(.151,.680,.952,.174,0,-.060),(.176,.710,.974,.19,0,-.057),
        (.248,.689,.958,.20,0,-.051),(.310,.665,.913,.201,0,-.040),
        (.383,.604,.763,.209,0,.016),(.444,.548,.612,.193,0,.071),(.474,.480,.476,.161,0,.095)],denim,foot)
    z_shell(word+" | safety toe cap",[(.182,.671,.423,.139,0,-.314),(.202,.704,.451,.148,0,-.314),
        (.251,.696,.495,.150,0,-.301),(.316,.665,.505,.150,0,-.299),
        (.356,.615,.430,.135,0,-.298),(.369,.501,.329,.13,0,-.282)],pad,foot)
    box(word+" | instep guard",(0,-.093,.358),(.505,.310,.12),.055,plum,foot,(18,0,0))
    for j in range(2):
        box(word+" | instep strap",(0,-.129+j*.125,.428+j*.038),(.433-j*.023,.061,.038),.014,
            lilac if j==0 else violet,foot,(17,0,-5 if j==0 else 2))
    box(word+" | heel pull",(0,.298,.423),(.133,.111,.19),.035,orange,foot,(-9,0,0))
    for xx in (-.322,.322):
        for yy in (-.329,-.118,.098,.266):
            box(word+" | tread lug",(xx,yy,.084),(.066,.091,.104),.016,joint,foot,(0,0,0),2)

# Backpack, rebound hose, connector block and a recognisable circular rear fan.
box("Pack | shock frame",(0,.082,0),(1.031,.590,.996),.159,ink,pack)
box("Pack | orange outer chassis",(0,.175,.03),(.975,.577,.932),.143,orange,pack)
box("Pack | marigold case panel",(0,.418,.045),(.881,.190,.826),.090,sun,pack)
box("Pack | graphite fan plate",(-.025,.498,.073),(.704,.075,.613),.107,denim,pack)
drum("Pack | fan register",(-.036,.515,.075),(-.036,.567,.075),.251,alloy,pack,40)
drum("Pack | fan well",(-.036,.559,.075),(-.036,.576,.075),.205,ink,pack,40)
for j in range(-2,3):
    dy=j*.068
    length=2*math.sqrt(.187**2-dy**2)
    box("Pack | fan louvre",(-.036,.584,.075+dy),(length,.035,.029),.011,steel,pack,(0,0,0),2)
for j in range(3):
    box("Pack | charge indicator",(-.184+j*.169,.516,-.282),(.112,.021,.024),.009,
        mint if j < 2 else burnt,pack,seg=2)
for side in (-1,1):
    box("Pack | corner runner",(side*.447,.154,0),(.159,.562,.753),.055,teal if side==1 else joint,pack)
    for z in (-.258,.258):
        box("Pack | rigid side band",(side*.476,.164,z),(.129,.564,.091),.030,ivory,pack)
line("Pack | braided return hose",[(.362,.267,.35),(.544,.428,.440),(.682,.416,.286),
    (.715,.341,-.035),(.697,.192,-.249),(.627,.043,-.367)],.053,ink,pack,6)
for p in ((.682,.390,.237),(.712,.345,.010),(.705,.252,-.167)):
    capsule("Pack | hose ferrule",p,(.117,.122,.066),steel,pack,(11,4,0),16)
shaft("Pack | antenna socket",(-.34,.32,.342),(-.34,.32,.534),[(0,.101),(.18,.123),(.65,.119),
    (.83,.087),(1,.078)],cream,pack)
shaft("Pack | spare insulated bit",(-.34,.32,.449),(-.36,.34,.734),
    [(0,.061),(.15,.064),(.72,.056),(.85,.046),(1,.02)],teal,pack,16)

# One elbow is lifted as the technician presents the insulated spanner.
for side, label, shoulder, elbow, wrist in [
    (-1,"Tool arm",(-.604,-.005,1.992),(-1.071,-.032,1.721),(-1.290,-.309,1.998)),
    (1,"Resting arm",(.603,.025,2.002),(1.063,.109,1.786),(1.124,-.208,1.521)),
]:
    arm=assembly("05 | "+label,parent=relay)
    capsule(label+" | shoulder joint",shoulder,(.44,.447,.46),joint,arm)
    shaft(label+" | jacket sleeve",shoulder,elbow,[(0,.226),(.09,.295),(.24,.327),
        (.43,.333),(.63,.306),(.75,.277),(.83,.288),(.91,.283),(1,.234)],sun,arm,28)
    upper=Vector(shoulder)
    upper_axis=Vector(elbow)-upper
    shaft(label+" | rolled sleeve hem",upper+upper_axis*.72,upper+upper_axis*.96,
          [(0,.286),(.19,.300),(.74,.293),(1,.262)],orange,arm,24)
    capsule(label+" | elbow swivel",elbow,(.401,.373,.392),joint,arm)
    limb=Vector(wrist)-Vector(elbow)
    shaft(label+" | bellows",Vector(elbow)+limb*.03,Vector(elbow)+limb*.54,
        [(0,.180),(.12,.207),(.26,.183),(.36,.211),(.49,.19),(.62,.209),(.75,.188),(.90,.208),(1,.185)],steel,arm,24)
    shaft(label+" | gauntlet cuff",Vector(elbow)+limb*.37,Vector(wrist)+limb*.14,
        [(0,.198),(.08,.224),(.22,.246),(.73,.261),(.87,.268),(1,.233)],denim,arm,24)
    shaft(label+" | cuff piping",Vector(elbow)+limb*.84,Vector(wrist)+limb*.03,
        [(0,.26),(.18,.273),(.75,.271),(1,.254)],lilac,arm,24)

toolhand=assembly("06 | Spanner grip",(-1.333,-.358,2.088),(-8,-13,6),relay)
capsule("Grip | broad palm",(0,0,.016),(.521,.407,.488),glove,toolhand)
for j in range(3):
    z=-.130+j*.137
    capsule("Grip | gauntlet finger",(-.047,-.126,z),(.423-j*.017,.258,.163),pad,toolhand,(3,-9+j*4,9),20)
capsule("Grip | thumb knuckle",(.174,-.087,.10),(.182,.244,.281),sun,toolhand,(-17,-31,-4))
capsule("Grip | thumb",(.115,-.167,.165),(.230,.165,.128),pad,toolhand,(5,20,-4))

hand=assembly("07 | Relaxed gauntlet",(1.166,-.255,1.364),(7,9,-8),relay)
capsule("Hand | broad palm",(0,.006,.012),(.553,.435,.491),glove,hand)
for j in range(3):
    xx=(j-1)*.14
    capsule("Hand | curled finger",(xx,-.098,-.113+abs(j-1)*.021),
        (.171,.276,.300-abs(j-1)*.036),pad,hand,(-13,8-j*7,0),20)
    capsule("Hand | knuckle protector",(xx,-.157,.009+abs(j-1)*.012),
        (.148,.136,.143),sun,hand,(0,0,2),16)
capsule("Hand | wrist thumb",(-.204,-.093,.100),(.212,.260,.308),pad,hand,(-13,-31,-8))
capsule("Hand | thumb end",(-.151,-.163,.019),(.166,.165,.175),sun,hand,(0,-21,0),16)
box("Hand | back reinforcement",(0,.186,.09),(.352,.073,.240),.036,burnt,hand,(0,-5,0))

wrench=assembly("08 | Insulated service spanner",(-1.406,-.316,2.161),(-7,-22,-4),relay)
wrench_outline=[(-.077,-.438),(-.113,-.393),(-.097,.234),(-.126,.324),
    (-.254,.419),(-.304,.544),(-.291,.679),(-.245,.767),(-.195,.799),
    (-.158,.780),(-.161,.600),(-.045,.517),(.084,.558),(.134,.729),
    (.180,.754),(.221,.737),(.280,.622),(.276,.474),(.218,.371),
    (.139,.312),(.105,.243),(.108,-.391),(.073,-.438)]
silhouette("Spanner | forged open-end blank",wrench_outline,(0,0,0),.168,.028,alloy,wrench)
handle_poly=[(-.071,-.45),(-.113,-.421),(-.124,-.348),(-.117,.262),
    (-.093,.307),(.094,.307),(.119,.262),(.126,-.348),(.113,-.42),(.065,-.45)]
silhouette("Spanner | insulated grip",handle_poly,(0,0,-.006),.193,.033,teal,wrench)
box("Spanner | grip flare",(0,0,.238),(.299,.218,.090),.029,ink,wrench,(0,0,0))
box("Spanner | grip flare stripe",(0,-.004,.258),(.268,.222,.026),.009,sun,wrench)
inlay=[(-.051,.000),(-.067,.019),(-.064,.275),(-.032,.297),(.037,.297),
       (.060,.274),(.064,.020),(.043,.000)]
silhouette("Spanner | warm grip insert",inlay,(0,-.099,-.330),.014,.007,sun,wrench)
for zz in (-.335,-.261,-.187):
    box("Spanner | grip rib",(0,0,zz),(.245,.203,.026),.011,ink,wrench)
drum("Spanner | scale rivet",(0,-.076,.369),(0,-.100,.369),.041,steel,wrench,20)
box("Spanner | jaw calibration mark",(-.208,-.087,.576),(.053,.013,.086),.010,steel,wrench,(0,-12,0))

# Studio lights orbit with the camera. Each side stays legible when it turns forward.
def angle_at(obj, target):
    obj.rotation_euler=(Vector(target)-obj.location).to_track_quat("-Z","Y").to_euler()


def area(name, pos, target, watts, size, color, rig, size_y=None):
    lamp=bpy.data.lights.new(name,"AREA")
    lamp.energy=watts
    lamp.shape="RECTANGLE" if size_y else "DISK"
    lamp.size=size
    if size_y:
        lamp.size_y=size_y
    lamp.color=color
    obj=bpy.data.objects.new(name,lamp)
    bpy.context.collection.objects.link(obj)
    obj.location=pos
    angle_at(obj,target)
    obj.parent=rig


def export_glb(path):
    # Bake positive bevels and combine components by their modelling assembly.
    # Children keep their original vertices, normals, material slots and local origin.
    # This cuts the download overhead of separate meshes for every screw and stitch.
    bpy.ops.object.select_all(action="DESELECT")
    bpy.context.view_layer.update()
    clones=[]
    graph=bpy.context.evaluated_depsgraph_get()
    for group in groups:
        children=[p for p in parts if p.parent==group]
        new_meshes=[]
        for original in children:
            evaluated=original.evaluated_get(graph)
            data=bpy.data.meshes.new_from_object(evaluated,depsgraph=graph)
            copy=bpy.data.objects.new(original.name+" export",data)
            bpy.context.collection.objects.link(copy)
            copy.matrix_world=original.matrix_world
            new_meshes.append(copy)
        if not new_meshes:
            continue
        for copy in new_meshes:
            copy.select_set(True)
        bpy.context.view_layer.objects.active=new_meshes[0]
        bpy.ops.object.join()
        obj=bpy.context.object
        obj.name=group.name+" | sculpture"
        obj.parent=relay
        matrix=obj.matrix_world.copy()
        obj.matrix_world=matrix
        clones.append(obj)
        bpy.ops.object.select_all(action="DESELECT")
    for obj in [relay,*clones]:
        obj.select_set(True)
    bpy.context.view_layer.objects.active=relay
    bpy.ops.export_scene.gltf(filepath=str(path),export_format="GLB",use_selection=True,
        export_texcoords=False,export_tangents=False,export_animations=False,
        export_extras=True,export_cameras=False,export_lights=False,export_yup=True)
    for obj in clones:
        bpy.data.objects.remove(obj,do_unlink=True)
    bpy.ops.object.select_all(action="DESELECT")


def generate(args):
    args.out.mkdir(parents=True,exist_ok=True)
    if not args.skip_glb:
        export_glb(args.out/"relay.glb")
    if args.glb_only:
        return

    scene=bpy.context.scene
    scene.render.engine="CYCLES"
    scene.cycles.device="CPU"
    scene.cycles.samples=args.samples
    scene.cycles.use_denoising=False
    scene.cycles.max_bounces=5
    scene.cycles.diffuse_bounces=3
    scene.cycles.glossy_bounces=3
    scene.cycles.seed=17
    scene.render.film_transparent=True
    scene.render.resolution_x=scene.render.resolution_y=args.size
    scene.render.resolution_percentage=100
    scene.render.image_settings.file_format="PNG"
    scene.render.image_settings.color_mode="RGBA"
    scene.render.image_settings.color_depth="8"
    scene.render.image_settings.compression=15
    scene.view_settings.view_transform="AgX"
    scene.view_settings.look="AgX - Medium High Contrast"
    scene.view_settings.exposure=.04
    world=bpy.data.worlds.new("Soft neutral studio")
    world.use_nodes=True
    world.node_tree.nodes["Background"].inputs[0].default_value=(.59,.66,.80,1)
    world.node_tree.nodes["Background"].inputs[1].default_value=.42
    scene.world=world
    rig=assembly("Studio turntable")
    area("Studio | broad warm key",(-3.7,-4.7,7.2),(0,0,2.0),655,4.2,(1,.87,.74),rig)
    area("Studio | blue fill", (4.6,-3.4,4.9),(0,0,1.8),390,3.5,(.71,.84,1),rig)
    area("Studio | rim softbox", (1.5,3.1,6.0),(0,0,2.25),805,3.1,(.85,.94,1),rig)
    area("Studio | low bounce",(-.7,-4.0,1.2),(0,0,1.53),61,3.6,(.86,.91,1),rig)
    area("Studio | warm kicker",(-4.4,1.4,3.0),(0,0,1.70),210,2.3,(1,.66,.39),rig)
    camera_data=bpy.data.cameras.new("Product camera")
    camera_data.type="ORTHO"
    camera=bpy.data.objects.new("Product camera",camera_data)
    bpy.context.collection.objects.link(camera)
    elevation=math.radians(11.2)
    azimuths=[math.radians(29+i*45) for i in range(8)]
    bpy.context.view_layer.update()
    # One orbit, scale and centre across all eight images. Nothing jitters on rotation.
    pts=[p.matrix_world@Vector(point) for p in parts for point in p.bound_box]
    lowest,highest,outer=100,-100,0
    for a in azimuths:
        right=Vector((math.cos(a),math.sin(a),0))
        up=Vector((-math.sin(a)*math.sin(elevation), math.cos(a)*math.sin(elevation), math.cos(elevation)))
        vertical=[p.dot(up) for p in pts]
        lowest=min(lowest,min(vertical))
        highest=max(highest,max(vertical))
        outer=max(outer,max(abs(p.dot(right)) for p in pts))
    mid_z=(lowest+highest)/(2*math.cos(elevation))
    camera_data.ortho_scale=max(2*outer,highest-lowest)*1.040
    camera.location=(0,-12,mid_z+12*math.tan(elevation))
    angle_at(camera,(0,0,mid_z))
    camera.parent=rig
    scene.camera=camera
    magick=shutil.which("magick")
    if not magick:
        raise RuntimeError("ImageMagick's magick executable is required to encode the turntable.")
    with tempfile.TemporaryDirectory(prefix="relay-art-") as temp_dir:
        staging=Path(temp_dir)/"view.png"
        for index in args.views:
            rig.rotation_euler.z=azimuths[index]
            scene.render.filepath=str(staging)
            bpy.ops.render.render(write_still=True)
            target=args.out/f"view-{index}.webp"
            subprocess.run([magick,str(staging),"-channel","RGB","-selective-blur",
                            "1.2x0.82+13%","+channel","-strip","-define","webp:method=6",
                            "-define","webp:alpha-quality=93","-quality","87",str(target)],check=True)
            print(f"RELAY view {index}: {target} ({target.stat().st_size:,} bytes)",flush=True)


if __name__=="__main__":
    generate(options())
