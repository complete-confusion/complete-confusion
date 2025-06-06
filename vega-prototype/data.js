const csvContent = `
id,predicted,actual,confidence_score,processing_time_ms,image_size_kb
qQvH48H2,Rabbit,Dog,0.82,147,479
Md2xoEMJ,Horse,Rabbit,0.85,134,23
UbloVJSV,Bird,Dog,0.7,172,440
rnGL5JHn,Cat,Bird,0.98,166,476
wB8BbypD,Rabbit,Cat,0.54,290,355
Db8yXo0o,Fish,Horse,0.59,135,345
5Mveb8FM,Fish,Fish,0.82,175,202
XqBc0Fkl,Fish,Bird,0.8,243,465
juJFflWT,Bird,Bird,0.82,81,210
6defMlUf,Dog,Dog,0.9,95,231
px5k8HGX,Cat,Dog,0.72,226,76
lpwVuGdi,Fish,Cat,0.76,286,105
6iVWLl7P,Cat,Cat,0.92,250,121
Pvq0hE0C,Fish,Cat,0.9,275,85
Js98gkc1,Rabbit,Dog,0.71,270,72
9nWmp1n9,Rabbit,Fish,0.93,92,292
fEIQxql4,Cat,Bird,0.66,296,484
lKyX4DA6,Horse,Cat,0.8,65,376
cQUxQGDQ,Dog,Bird,0.56,126,35
BUXjL0qh,Rabbit,Rabbit,1.0,226,128
RNA2Vsww,Cat,Bird,0.82,240,304
Uh0z8fsA,Cat,Cat,1.0,185,474
HCdTLKvp,Dog,Dog,0.68,128,205
Sdy0COWS,Rabbit,Rabbit,0.68,242,336
QWgdBD0V,Cat,Rabbit,0.79,164,280
C7DrG2Qb,Dog,Cat,0.51,178,44
4Z1u5ENH,Rabbit,Horse,0.74,247,260
LxpjUQwu,Rabbit,Dog,0.73,97,333
CqHrrRdU,Rabbit,Dog,0.92,197,242
Ubabr8rC,Rabbit,Rabbit,0.84,200,194
jm0wLbWD,Cat,Fish,0.9,133,25
tfdoaDwU,Cat,Fish,0.96,148,373
7TSJmQ4U,Cat,Dog,0.72,230,404
yZrAMBH4,Bird,Dog,0.67,187,241
I6sAxHx0,Cat,Bird,0.58,273,438
YcIiOdtZ,Horse,Cat,0.93,52,143
0H1HtJRe,Fish,Rabbit,0.52,194,415
rrJG4e6d,Dog,Fish,0.76,271,65
vS5KPsgS,Cat,Rabbit,0.83,99,436
G8zDfS55,Dog,Cat,0.86,216,186
XYLfeZ1D,Dog,Bird,0.97,65,463
AxVi18xw,Rabbit,Horse,0.61,60,281
hN5fktUr,Bird,Bird,0.77,242,85
bRjCqrWA,Dog,Rabbit,0.71,128,185
qjQIIkPZ,Dog,Horse,0.76,65,219
S9ZCbmb6,Horse,Dog,0.83,170,315
O7zmXqJH,Rabbit,Rabbit,0.57,127,163
pcCplgzY,Cat,Cat,0.7,107,283
uO7Jh5r9,Rabbit,Bird,0.85,230,456
Tw6uovG6,Horse,Horse,0.73,296,393
iEBAV0eS,Horse,Horse,0.51,294,377
jCdQ9pqi,Horse,Rabbit,0.8,119,468
ED6ykuqW,Dog,Cat,0.9,209,227
6F6kjSJg,Dog,Horse,0.58,200,372
tvqOJ3Y6,Horse,Dog,0.53,89,470
ZG0xvNLl,Dog,Bird,0.78,202,207
gNGGYG18,Rabbit,Cat,0.85,227,368
gVmQjfpj,Cat,Horse,0.92,183,193
MWKbn5a9,Rabbit,Dog,0.92,224,475
ljOSgVF6,Fish,Rabbit,0.92,257,449
BB8kTGI1,Rabbit,Fish,0.82,170,98
vm3SmIxt,Cat,Bird,0.54,169,477
PGIJgX95,Fish,Dog,0.79,195,30
44uM5a9r,Horse,Horse,0.54,124,122
3Tg34kZ2,Cat,Bird,0.92,149,281
28OmTQ9K,Fish,Rabbit,0.69,147,356
4XScFHtW,Bird,Cat,0.57,284,327
BLGSmE1r,Rabbit,Horse,0.63,138,287
Xwd4M8GR,Bird,Dog,0.74,168,77
sGDBrnuG,Bird,Dog,0.69,58,394
2MgzAkwc,Fish,Rabbit,0.99,93,488
YdwHRXYO,Fish,Rabbit,0.82,167,331
5Zh5IEid,Fish,Fish,0.67,156,139
dcqvPvrx,Rabbit,Horse,0.55,88,366
nBiMj7O9,Dog,Rabbit,0.87,118,388
M3LEmLih,Dog,Cat,0.8,291,275
mDXYOGDo,Rabbit,Dog,0.53,235,482
M57q7X9A,Bird,Cat,0.74,109,199
KKNLN8Jy,Rabbit,Rabbit,0.69,72,335
6wFklAbA,Fish,Fish,0.57,104,479
lWQCxS6S,Fish,Bird,0.55,97,216
AvHcgcFi,Horse,Rabbit,0.81,244,316
AtOgVHLy,Cat,Horse,0.83,100,273
iZzP8VMc,Cat,Dog,0.72,256,329
ouzOCLkV,Bird,Dog,0.78,73,491
WZ3Fpxjz,Bird,Fish,0.63,254,143
3yuvTw3E,Cat,Horse,0.82,56,275
dRNgitVn,Dog,Horse,0.67,187,449
7MK6l9kK,Bird,Rabbit,0.63,54,452
LYTBeBVe,Cat,Dog,0.85,256,74
6gM27Nb6,Horse,Fish,0.95,232,56
H3g5E51Q,Cat,Fish,0.68,196,428
Mr6MszOQ,Cat,Dog,0.96,102,320
oaiIve5z,Bird,Bird,0.75,132,75
pjdGIZoU,Dog,Cat,0.95,181,478
gxO7N1pB,Fish,Horse,0.63,53,413
MiZVV8MS,Bird,Bird,0.63,90,117
IsDxrPxz,Rabbit,Rabbit,0.94,68,325
k6Tep5ea,Dog,Cat,0.77,292,120
KLMIkjdt,Dog,Bird,0.64,76,233
`;
