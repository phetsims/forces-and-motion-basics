/* eslint-disable */
import simLauncher from '../../joist/js/simLauncher.js';
const mipmaps = [
  {
    "width": 65,
    "height": 196,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAADECAYAAADAikwuAAAAAklEQVR4AewaftIAACfqSURBVN3BC3xbhYHg67+OztE5tmRZlhXLRpEt2yHGkMhKWewSWqLcSQp0k2LYnQ1s04vpbSk7hQGmLXSXnYZ0hr1tKeUR5naAuSTMLwxkpwMh0HbaZDbOdAl1UhpbPIzTJLajCFuOrci2ZJ+jl1ea4q3rsWVJdh7d79NxHkiy4gJagZsdNpO3SBY5N66GR8bUvcD2uKb2cQnRsYQkWbEAT1jNSttNzTWsrrVRJItMO/LhIP94pD88MqY+BeyKa2ofaZKseIGbAQ+/0wn0A+1xTe3kPNKxRCRZub/crGy7sbnG0nxFJfOZ1BK82ztMR3eQaQ6bicsdpayuszHtRCBMaFzFd2qEd08N9wFPAbvimhpmielYJElWPMDOdU3LPTc111Akiyy1SS3Boa4Ah3yBvgk1/kBcU/eyhHQsgiQrjzhspm2f39CAw2bifAuNq7x0oIcTgfCTcU19gCWipwCSrLj0ovjauqblbZ/f0IDVrHAhFMkiLY2VhMa1Tw6eU12pZOJ1loCePEmy0lZuVl770mevuuK6VZchiQIXmrvOxqSW9PiHJ1ypZOJ1FklPHiRZ2bm6zvbI3ZtXK/ayYs6nwHCEv973Lq5KM+ZiA7M11ljRofOcCkZcqWTidRZBT44kWdnZ3FjZ1nZDI5IocL6Ziw24Ks38zU/e53KHBXOxgdlWOCwEhqOe4fFYVyqZ+JAC6cmBJCs7mxsr2z7/Rw1cSOZiA5c7LPzNT97HXWejSBaZrbHayuH3B25MITybSiZUCqBnAZKstK2usz3SdkMjF4O52MBym4mXDvRw3arLmE0SBexlxcqvf3O2MpVMvE4B9GQhyYqn3Ky8fPfm1YokClwsVrPC+EScE4FRVjgszGYvK+ZEYNQzOpE4lEom+siTQHY7/5/PXmUpkkWWUmhc5ciHg+RjXZMD36lhJrUEc7mpuYa0bRRAYB6SrLSta1rucdhMLLWfHuknX0WyiNfj4FBXgLmscFhY4bB4JVnxkieBOUiyYimWxSduaq5hqU1qCd49NYzDZiJfzVdU0vHhIPO5qbmGtG3kSWBubeualluKZJGlduTDQSa1BA6biUKscFh499Qwc1nhsLDCYfFKsuIiDwJzKFak+9Y1OTgfOrqDNNY7KZS7tpzfBEaZj7fJQdo28iAwiyQrratqy11FsshSm9QSLL/MQYu7gROBMIVYXWfj3d5h5rO6zka5WWmVZMVCjgT+tTtuaq7hfDgRCNPibsBhtxEaVymUtURhUkswn+YrKi1AKzkSmEGSFZfDZmq1liicD4HhKM3uBhrrnJw5G6VQlzssBIYjzKe50U7afeRI4Pe1tjTaOV/ODEdYbrfR4m7gRCBMoaxmmcBwhPlYSxRWOCweSVZc5EDg992xus7G+TKpJXDYy8loXHk5oXGVQlhLFCa1JNm0NNpJayUHIh+TZMXisJk81hKFXASGI0xqCQLDESa1JBlnhiNMagnmpZeZ1uJu4G9+9CZFskgiJWBftoz5jITDkNSY7UZqmM/qWhvQcwfwJAsQ+Z3WlkY7cwmNq5wIhPlNYJTA2QjLL3PgsNtYbi+npc6Gw15OxnK7DYe9nFy0tW6grXUDudixex8ToZOsrrORERiOsJAiWcRhM3kCw1jimhomC5HfWbfCYWHapJbg3d5h2jsDTMYSfO6PPsV/vfc2GuucXGgb1q7hL3ccYXWdjQyHzUQu3HU2AsORVmAXWYh8rNystDpsJia1BIe6ArR3naH5ikq+9G+v4kh3kA3XrqGxzslMB94+RvdJP431TjZcu4ZCBYIj7H/7GBm3blyL2VjMTI11TobCMfK1uq6cnx7pWwfsIguBNElWPPUOi+VEIMxje94J//RI3/ZJLfFAuVnGWqJgNcsc8fUw04G3j/H07n00uxv4h/2HGYtOUIix6ASff/AxzMZiMj73J99mLDrBbCtqawiNq+TDYTOR5mUBetL0ongbcOOBX/s7J7XE+rim7tWL4qAo6u//xOUVZPSdjbNx7RqmafEE/27jdTTWO9m0rhnZIFEI2SDRdssGGuudeK6oo6WpAbOpGNkgMVOvf5DQSBB7WTH5OBEYtYxOJJ5KJRMq8xD4rZsDw5FdcU1dE9fUPtLimtoXGI6Q4bCZ6D51mpka65w47OUstcY6J2ZjMbM1uxsIDEfJ1+UOC2keshD4rb64pt7JLKExtZ2PxdVxxqITzNR9ys9Dj++k+5Sfxdixex//6dt/RSA4wnyW222cGY6QL4fNSJqXLATS4pp6Jwtw2Ex0n/Qz09O79/Hq/rd46PEXKFT3KT9P797HgcPHeHr3PubjsJczqSXIV5EsklZKFgLZdZ4IhMm43FHKEV8PMwWCw2R0n/RTqAOHjzGt+9RpspGUEvK1wmEhzUMWAtmN8rEVDgsdvh5mMhuLWUpjkUmyMRuLOR8EclQki4xFJ5jJYbeRsWHtGgrVWO9kWmO9k/Oh3Kx4yEIkR6FxFYfdxkwP372FWzeupbHeSaE2XLuGWzdeR4evhz/d+jnOh7ISxTJ4lnmJ5Cg0pnJlXQ0zmY3FtLgbWKzvfu1OLiaB7NY5bCb+TyewgCJZJB9j0Qk6fD1sffAxAsERLgXnxtUwWQgsse6Tfnbs3kfbLRtw2Mu5FIyMqZ1kIZBFuVnx8DGrWeGDU34W0ljvZCw6wYZr17DUgmfPkq/QuEpamCwEsigrUSx8zFqiEAgOsxCzsRizsZjuU36WmiikyFfgbIS0LrIQmIckK54iWWSmuDrOWHSChTx89208vXsfS6nD14PDZiJfgeEoaZ1kITA/y3KbiZkud1g4cLiThTTWOfnht77KUuo+5Wf5MiP58p0aJq2dLATm53XYjMy0uq6c/W8fYymNRSd4df9hDrx9jGw6fD04bCbyERpXCQxH2uOaGiYLkfnVWM0KMzlsJl468A6B4AgOezmzdfh6aHE3kE33KT+B4DAdvh46fD1MJAT6+/vZ9/9tI5sTvf1s/sRq8vHuqWHSXmQBIvPzOGwmZvN6HDy9ex/f/dqdzPbos68wMDJGQ3Uls0W0BDa7g1JLKU3uJrb+p2/wvaYmvvTlL/Mn//6PaKxzMp8Dbx+jwmIgX+1dAdL2sgCReaxwWDzMofmKSna81kWHr4cWdwMzffdrX+TPn32NN37+cyylpWTT39/PH//xf+Cz16zg1o1ryWb/4U5arrCTjxOBMKExdVdcU8MsQM8cJFnxrq6ztTXWWJnL5cst/LcX/pFr11zJsrJSpi0rK0Ukydf//C+puuwyGhoamK3L5+P55/+GbX/+n7nvto1sXLuGbMaiEzy160f825Ya8vHSP/UQGlfvTCUTgyxAxxwkWXnkS5+9atvqOhvzCQxHePHnv+H5v3yAxjonMwWCIzy9ex8dvh5WNFzJtKFALw67jY3XruHWjWvJxUOP7wR1kHVNy8lVaFxl+4sd7XFNXU8OdMxBkpVj3/nydZ4iWSSbwHCEF3/+Gx7/5ldocTewlMaiE2x98DH6zgyw7f9uoUgWydVL/9TDke7B9XFNbScHArNIsuJy2EyeIllkIQ6bibs3N/LQ937Iq/sPs1Q6fD189sv/lbHRc9zUXEORLJKr0LjKke7B9rimtpMjgX+t1etxkCtricK9tzTx/Cuv8uizr7AYY9EJHn32Ff70L3ew+ZNOJmMJ1jUtJx8/PdJP2ovkQWCWYkW6b3WtjXwUySL33tJE76kP2frgY4xFJ8jXgbePsfXBx3DYbVhLFH56pB9vk4N8TGoJ3usd6Ytr6i7yoGcGSVZckqhvGxlXLTrAXGxAEgWyOREIc+KjMB3dQU4EwnT3DrTv+ckhi62sVGmsd7KQDl8P33x8JyfPDPK9r32R6//NKna8tI+rL68gGJ7kH4/00336HEPnJskokkUkUWAu//RrP939oQdSyUQnedAxB0lWvIAXWEeaw2byFski00LjKqExtZ3f6gT6gc64praTJsmKBdjmsNvub7tlAxuvXYPDXs607lN+Onw9vLr/LRrrqrl141pa3A1Mu/zGL/UBncWK5Lms3OgqkkUmtQSTWoLAcASHzYRjmYnlNiMrHBYcNhMZ3/7bjvDImFob19QwedBxHkmyYgHuN5uKtzXWOZnmsNtocTewYa0Hs7GY2S6/8UthoB14AAgDHsAFuIBSwMNveQALaQ6bicBw5Mm4pj5AnkTOv5sb65zs/t43yFWLu8Hy7T852XrD3YlwXFPvBNpZQGAYT1xTOymAyCJJsmIBWoGbAc/1V+tcfKzr+BQPf1nPUy+NkK9PX60jre2P1ha1keYfJNwbmOoEOoEX45rayQxxTe2kQCKLIMnKIxYz91VX6izPbdPjXqlj2ug4fPLzCe65XeDR54cJBEdw2MtZSPcpP4NnjwMi11+t4x//WuRjltFxvP/865T3jfap+3/yC6UvNMr2uKbuYpFECiDJigV47Z7bBW9piY5SE7hX6pjpjUMptm4WyNi8TmD/28doa91ANt2n/Gx98DGef0QgIzzO7yktgc3rBCAFCC5g5+43lTuAW+KaGqZAAoU5+Nw2vfd7f6bnjfYUm706ZusfgOs/oSPjC5sEduzex1h0gvns2nuArQ8+xve/prF5nUCGpYR/ZfebKR59LsVjf6bnuW16ntum9wIHJVmxUCCBPEmy8tpz2/SerZsERsf5FzVVOmarqYKu41NkfPpqHZ6GSbY++Bhj0Qlm6vD1sPXBx9j9+h7+/vsxtm4SyHjjUAr3Sh0zvXEoxTMvp/jZX4uUlvAvtm4SeG6b3gPspEB68iDJyiMP36W/+57bBTJ+tD/FSpeO5tU6Zistgf//H6b4488IZGxeJ/B3PwnzwqtHCQwN0/XhKR599hX2/PSn3HZTmOe26Vnp0jHt8RdT/PFnBGou05ExOg5bvp7k0E6R0hJ+j3ulDt9xrjhxRt+VSiY+JE8iOZJkxVVTpdv28JcFpv3zO1Pcc7vAXGqqdIxGpvAdn8K9UkdpCfzyJZHdb57jjfb/wUgI7rxZxxc2SZSW8Ht+8c4Upwem+PTVOqY980qKr94uUFrCnL73NYE3DqWeAPaSJ4HcbXv4LoGZfMencK/UMZ/v/Zmeu7YnGR3nf9u6SWDP9/Xs+b6ee24XKC3h9/iOT3HX9iTPbtMz0xvtKb6wSWA+NVU6tm4SXJKstJEngRxIsmKpqdK1bd0kMG10HCwlZOVeqeOe2wW+8YMko+Ms6JmXU9y1Pcme7+upqdIxzXd8CvdKHaUlZPXwXQJpd5AnPTnQi+LdD9+lv7F5tY5pR9+bAp2O66/WkY17pY7RCPzpd5I0uHTUXKZjtjcOpbjvO0nUGPztoyI1l+mY6e9/PkWDS4d7pY5sLCU6RiO43unW96eSiU5yJJKbOzZ7dcz06at1uFfqyMXWTQKfvlrHo8+l+MYPprCUQKlJx2hkivA4XH+1jme36amp0jEX3/Ep7rldIBcPf1nP7h+nngiPKXvjmhomByILkGTFtXmd4Kmp0jHTXduTPLdNT65qqnQ8t03PtP6BKWqqdOTi9MAU7pU6clFaAl+9TW959Lnk/cAj5EBgYa2bvTpm8x2fYjFqqnScL/fcJmAxcx85EljYzZ++WsdslhIumE3rBHzHp8hVaQl89Ta9RZKVNnIgkIUkKxb3Sp23pkrHTL94Zwr3Sh0XymgERsfJy9ZNOtK2kQOB7LybvQJzKS3RcaFs3aTj0eeT5KOmSsfWTYJLkhUvCxDI7ubN63RcbDVVOsLj0D8wRT7uuV0g7T4WIJCFxUyre6WO2foHpig1cUFt3STwi3emyId7pQ73Sl2rJCsushCYhyQrre7LdRbm0D8ATSt1XEjXX63jjfYp8lVTpSPNQhYC8wv3fwSj41wS3Ct19A9MkY83DqU43JXqjGtqJ1kIZFFcvJy7tie5VLhX6vAdnyIXd21PsuXryfaRMOtZgEAWG69dg2S4li1fT9I/MMXFdv3VOv75nSmyGR2HG+9O8E63g7Sn4poaZgEiC/ju1+6kw7eWe79zgKHhTq6/Wkd4HPiEjgtt8zqBG+5OcM/tAnN55uUUO/5O5r985S5KjMVsffCxdcBeFiAyP6/DbiOjxd1Ai7uBsegER3w97HrtAOHICUDHhVRaAu6VOh59PsXDXxbIGB2HZ15J8fpBmf+rZQN7/2oDZmMxH/OSA5EsHPZyZjIbi9lw7RrGIpP0f3SCi+Ge2wW2fD2JeyW80T7FwaNW2m7ZwIvfWYvZWMxMLe4GT4evxxLX1DBZiBTAYS+n+wQXhXuljv6BKX7wtyt4+O7b2HaPk/m0uBvo8PV4gb1kIfCHqa/EVExjnZNsmt0NpK1jAQLza1put3Gp6R+YIq0zEBxmIS3uBtK8LEBgfhaHvZxLzemPyOjqPulvJwct7gaPJCsushD4wxUOBEdYSIu7gTQPWQj8gekfmOJjXWeCwyyk2d1A2jqyEJiHpcTo4hLUP0BGO9B5xNfDQlrcDaR5yEJgHg21y11c2to7fD3korHe6SULgT9QcU0Nd/h6OsmB2ViMJCsW5iGSo1f3H2bX3v1svHYNze4GLhHtDz2+0xMIDjMWncBsLKbEVMwPv/VVZmpxN9Dh6/EA7cxBZA6SrLhKTMXMdOvGtdy6cS07du/jT779V9z7H7koaqrI8Eiy4nVWLWtrrHfy8N1bMBuLmc8Hp/yk9TEPkbm5rqxzMpd7t36OElMx/Wf+OxdDTZWOtCfabtnAvVs/h9lYTDZj0Ql+9e7xvrim9jEPkQI01jkhpeNiqL4MWtwNPPyV28jFi68dIDwefZEsBObW98EpP5eimiodueo+5efp3fv6gCfJQmAOcU3t+9W7x/vGohNciibV4yxkLDrBFx58LAzcEtfUMFkIzCM8Hn3xxdcOcCmqqdIRCI4wn+5Tflrv+YvwaGRifVxTO1mAwDzimvrI07v3db66/zBzGR2f4mJxN+g4ExxmLh2+Hr7w4GNh/8DZ9XFN7SQHerLQi+KeA28fu9FsKq70XFHHtOV2G8///T62bhK4GEYjU/yyy0qLu4GZduzex0OP7+zUYvH1cU39kBzpySKVTKh6Udzzi1+9pxzx9Xyysb6aZWWlZOz7H2+wdZPAxaDF4KdvWdm4dg0ZHb4etj74fQ68fWx7XFNvTyUTYfKgZwGpZEJNJRM/GxgZPfTyjw+5AsERl9lUzDvvH2brJoGLwV6uY8ffyYCOh37wAs/995/uGo9O3BLX1L0UQEeeJFnxAveVltD6y5dEaqp0XAyf/HwC3/GpJ4Gn4praxyII5Cmuqe1xTb2lpkpHTZWOi8VSQsb2uKb2sUgCBbKUcFF9+mqBNA9LQOAP2x0sAZE/MP0DU+x+c4of7kn2AV0sAZEC+QcJAxYukNFxeOaVFM+8nKTIWElodLAzrqlPsgT0FGhsQrzR3aBzVZbrUGTOi9Fx+NH+FA/+IMkjz5USnVrDFY1NDA+fRa8Xr4hGxrezBPQUSC+Kuh/9fMqz42XRcqw7SXAE7DawlOgo1Og4HH1vit0/nuK/PZ/kkedKOT54Ob/pj7F+vZdIJMrx48c5fdpPba2L0LnwoVQy0cci6VgESVYOXnllozcUOofJZCQWi5GMn6P+sij9H8Fmr47SEh3Z+HqmGI1McfIjI4GBCB5PE6dP+7nhhs9gMBjI6OrqorOzi4zqaicZJpOJDz7ofjKuqQ+wSCKLIMuyy2AwEAqFuOaaf4PVamVwMEgwOIg2FeT9wUYMIQMZR48epbGxEZPJRMbRo0e55pprMNmM1LpM1K6CgwcP4nQ6GRwMYjAYGBwMcvLkCSKRKNdccw3V1U5MJhOnT/sJBgdJ87IERBahrKzMVV9fT1mZlVgsTobBIBEKhbBayzAYDFRW2smornZiMBiorLQTCoUwmYxUVtqZyems5ujRX+F0Osk4ePAgJpOJWCyG3+/H7/cTi8WYVl3t9Jw+7XfFNbWPRRApkCQrXpPJiMlk4ujRo8RicSorP4PVasVqtRKJRDCZjEyz2ysJBgeprnZitVqZy4oV9axYUc80g8FAfX09VquVDKu1DIPBQCQS4eDBdkwmE2leYBeLIFI4V1mZlbfeeosMg0FiWlNTE7NZrWUcPXqUpqYmMtavX89C1q/3EgqdIxgcJKOrq4sMg0HCYDBgMBhIWwfsYhFECtfU1dVFU1MT586FsNsrycZgMGC1ljE4GKSy0s5cIpEIJpOJaVarFavVyrSmJv63wcEgJ0+eoKSkpHUcHohrapgCCRSudfPmTRgMBiKRKCtW1LOQpqYmurq6mMtbb73F6dN+clVZaWdwMIjTudwCeFkEgQKZTCZXd3c3J0+eZP16L/OJxWJEIhEyTCYTjY2NzPbBB91kXHllI/mwWsuw2ytJu5lFECiAJCveWCyGwWDghhs+g8FgYD6xWIyDB9v54INuMqqrncx04sRJzp0Lcd1115Evu72SWCyGLMteFkFPAfSi6P3EJz7Runr1KhZiMBiorXXh9/v59a+PUVpaislkIuPEiZP4/ae5/vrrKYRer6evr4+iIsUSiU68mEomwhRAoDAuq9VKrgwGA9dccw3r13vp7v6An/3s53zwQTfd3d1cd911FMpqtTI4GMRuryTNS4EECrPOai0jXyaTieuuu45QKER3dzc33PAZDAYDi1FZacdgMJC2jgIJFECWZZfBYKAQodA5rryykUgkwlKw2yuJxWLIsuylQAJ5kmTFUlZW5qJAkUiEUChExuBgkMWqrLQTDA5it1e4JFnxUACB/HkrK+0UKhqNYLVaqaysJBgcZLFMJhOh0DmczmrSvBRAIH/r7PZKChUKhYjFYtTX1xMKnWMpVFc7MRgMpN1BAQTy11pZaadQsVgcg8GAyWQiFouxFOz2SoLBQaqrnR5JVlzkSSAPkqy4qqudLhYhFosRi8XIsFrLCIVCLFZlpZ3BwSBOZzVpreRJID+tTmc1i2EwGAiFzlFZacdkMhGJRFksg8GAyWTEai0j7Q7yJJCfmysr7Sylc+dCLAW7vZJQ6BzV1U6PJCsu8iCQI0lWLFar1WsymSjU4GAQq7WMWCzGtFAoxFKornbi95/G6awm7T7yIJA7b2WlncUyGAwYDAamxWJxloLJZCISiVJd7USW5VbyIJC7dU5nNYsRi8WYbXBwkKVSX1/P6dN+nM7lLklWWsmRQO5aKyvtLMa5cyGMRhMGg8RMsViMpVBd7eTo0aP4/Wf6gE5yJJIjk8nkikQimEwmFiMajWC1WskIhUKk7QqFzrVVVtpZjBMnTuLz+cKxWGwXsD2uqWFyJJKjSCRyyz/8w6tPrFhR72pqasJkMpGvSCRCWZmVeDxGRiwWJ60/FotRiEgkQldXF6dP+8OxWOwp4Mm4pobJk54cpZKJD1PJxFOjY+Nd3d3dit/vvyKZTFJUVITBYCAX3d0fUltby7lzISYnVfx+P7FY7IGBgYEbA4GPLOfOhRgdHSOZTJFhMBiYKRQKcfbsMH19fRw9+iusyhQDg0OcPXu2KJVMtKeSCZUC6CiQJCuPtN2yYduZ4AgfnAwgyjJWqxWj0YTJZGK2YHCQEydOkhGJRDqB14G9cU3tJE2SlbYNa9fsbHE3MB6Z4INTfsYjE8xUYirmyjonjfVOmt0NmI3FbH3wMf7n0S4diyCyCBuuXUOLu4GMQHCEM8Fhjvh6mEvrJz9FifEzHHj7GLteO/BAXFPb+X17e3rPPPHDb33VQh7OBEdYLJHC9XWf8tPibiDDYS/HYS+nxd1ANjt27yOtk1nimhr2D5x96tX9h7fdunEtuQoEh9tZJIHC9Y1HJsjHWHSCDl9PZ1xTw8xt16v73+JCEyhcZ4evh3wcONxJ2ovMI66pfR2+nk4uMIECxTU13NN7po887Nq7n7S9ZBfmAhNYhPB4tC8QHCFXHwVHwkCYS4xAgSRZcbW4G7wOezm5+i9fuc0C7CQ7C3lwVi3zsEgChbvv1o3XkY9bN66lxd3QKsmKh3k01js95KGhdrlFkhUPiyBQOO+tG9eSr1s3XkdaK3OQZMViNhaTj43XriHNyyIIFECSFUuLu8FDAVrcDaStY26eFncD+WhxN5B2M4sgUBhPY72TQjjs5Swlh72cxnqnV5IVCwUSKJDZWMylYuO1a0hrpUACl5bwmeAI+Wp2N5C2jgIJXGDdp/yk9TGHuKZ2BoLD5KvF3UCaiwIJXGCB4DBp/cyjp/dMHwVorHd6KZBAYTo7fD0Uovukn7R25hEej3Z2n/KTL7OxmEIJFCCuqWEK1OHrIa2T+R3q8PVwIQkUqMPX00mexqITdPh6OuOaGmZ+ezt8PVxIAoULk6cjvh7S2skirql9v3r3eB956vD1dFIggcL1dZ/yk4/9hztJe50FhMejew+8fYxcjUUnSAtTIIHC9Y9FJsjH0feOh+Oa2s7CDnX4eshV90k/aZ0USOAC6T7lxz9wtp0cxDV17z/9sitMjgLBEdL6KZBA4TqP+HrIVYevh7TXyZF/4Oze7lN+chEIDpPWSYEEChcmD6/uf4u0veTu0IHDx8hFh6+HtD4KJHABBIIjdJ/0741rapjc7e3w9ZCruKb2USCBwnV2+HrIxf63j5H2OnmIa2q4w9fTSQ4+OhsKswgCBYprapgcvbr/LdL2kr/2Dl8PC/EPnO1kEQTOs0BwhO6T/r1xTQ2Tv64jvh7ON4HzrMPXQ9ohCtN5JjjC+SawCB2+nj4W0OHrIa2dAsQ1tTMQHOZ8E1icPhZw9L3j4bimdlKgsegE55tIgSRZaQNcWx98jMZ6J4111dy6cS2z+QfOdrII3Sf97YCX80gkT5KsWICDgIe06G/O8PfvncCo17Nr7352f+8bmI3FZHT4ekjr5DwYi07w6v7DjEcmSPNIsnI/sDeuqX3kSSR/rlVFRs9DVdUYBT0ZQ4k4zwTPwEchXt1/mLbWDcxgYYl1n/LzlW/+gLHIBJss5fyFo9bSq6lPvDk68sQQ3BnX1F3kQSBPcU3tJM0o6JlWIUrcY1/OUCJOh6+HmYyCvk2SlScogCQrbYCLWZ7evY+rBQPNJjNbrBVcVWRkk6Wcx5312CXDE+RJIE+SrHiWSQbmMhSPYTYWkzEWneDV/YfZZCnHLhnayJMkK23rzWU7a2XFxSwn3+kmmkqxqbScmYyCnmWiZJFkxUMeRPLXuqrIyGxHImMYBT2xox9yyy33kdFsNLPeUs6e0FAf+buj1qBwvEjPWHQCs7GYaUZBz9l4jFpZYS5xTe0kDyJ5kGTFY5cM960vsTBTNJVkT2iIb1ZVc1WRkZmiqSRpYQqwyVJONDTEv/+PD1LRUMO0oUScClFitmgqyXuT0T7yJJIjSVY8JkF/8MHKagszRFNJvhXo5YvLqriqyMhs0VSKtD7y19erqWyxVrDFWgET/ItoKskeYwlvhkfo1VRqZYVp0VSKCsngGoJHgCfjmhomB3oWIMmKRS+K36yVlZcfqqpRamWFab2ayjNDAW4oLWd9iYW5GAU9e0JDpJKJZ8mDXhRrG4qKb6yVFWYy6ATWFJewqsjIs2c/wiAI1MoKGUZBzyZLOWne4UT87kmdrlIvij2pZCJMFnrmIcmKSy+K99slw8tfXFZ141eWXUaZKDLtSHSMZ4YC3FOxnDXFJrLp1dTKwVTyxVQyESZHelFUjXr93S1GM3OpkAx8qqSU3SNBemMqa4pLmLaqyMgmS7lSIRk+2RdT71d1OpdeFLtSyUSYOeiZRZIVi14U/1/gFcBbKyuKUdBjFPSUiSIZB8fDvHbuLN9ZXkeFZGAh4WSCYxOR/lQy8UtylEomBs0G+ZH15jLmY9AJrDeX8T8jYxyJjrOqyIhBJzCtVlbYZClnVZHR8746cb+q07n0otiVSibCzKBnBklWPCa9/uAtZctuvNe+nC/aqmg2mYlPTXFwPMyPwyO8p07Qq6l8s6oao6AnFxZR4s3wiJpKJvaQh5GpqdYt1opKFtBiNDORSvHs2Y/4VEkpBp3AtPcno+wJDbFMNPCpklLPcCLeNqnTaalk4pd8TORjkqx4TIL+4PbLai21ssI0o6Cn2Wim2WhmKBHnmeAZmo1mjIKeXFWIEmkW8hfu1VRqZYWFrC+xkPGtQC/fdtSSsSMYIOMe+3IqRImMTZZyywvDg08cHDvXFNfUO0nTkybJisUk6I9td9RaamWF+RgFPevNZfwgeIZmkxmjoCcX709GOTge7kwlE3vIg14U28LJhOtTJaXkolZWMAgCz579iDdHQ9xaZmOLtQKjoGeaQSfQYjST5umOa65UMvG6wG89ceeyKkutrJCLLdYK9oSGyEU0leSF4QHSuijQm+ERctVsLCGaSvFQZTXNRjPz2WKtYL25rE2SlTZBkhVLhWRoW19iIVfrSyz0aZNkM5SI88LwAN8K9GIU9KSFyd+LRr2e3pjKdwZOE00lWciOYIB7KxzUygoL+aKtkrRter0o3rbJUt66qshIPgJxjfjUFA6DzEwHx8M8M3SG4+okq4pNfMZsZe+54XBsaurOVDKhkodUMtF5OpnQ6cBbIRnYPRKkVlaokAzMZSgR563IKFusFeTCoBN4fzJq0etFsfU2a4W3QjKQD4te4uB4mBajmYxeTeWJoJ9oKsVXKhx8qqSUYxMRnhv+qC+SSt4U19Q+CpBKJtrH4PU+Tb3iqiKj6+dj54imkqwqMjLbm+ERVhWbqJUVcnVwPIwINC2TDOSrVlbo0ybJ2BMa4kh0jC/aqigW9OwJDXFw7Fwf8BSwK66pYRYhrqmdwPojcH+trDzRq6nsGApwb4WDmXo1lfXmMnI1lIjTp6lhkUX6mv8EzUYzD1XV8MLZAY5Ex9qB7XFNbWeJxTX1yV4IAzuN+iJ2DAW4t8LBtIlUkgpRIldHImNEUkmLXi+Kd/dpquuqYhNGQU8u3p+M8sxQAIte4l77cs7G4zwR9Pf1auqdcU39z6lkoo/zJJVMdI6BblWR0RufmuJsPM5KpZiMg+Nh1pvLyEWvpvLj0RGMej36ppLSXZss5Tx79iPCyQS1soJBJzCXI9Exnj37Ee9PRtlireBTJRaeCZ7hZ2OhJ2NTU7fHNbWTCyCVTLSfTMS9t1krXO+pE/RpKquKjHREx1lZVIxR0JPNm+ERfjw6wiZLOW+GR/p0kqwc/AtHrdclK7wZHuFIdIxlooFaWWHaUCJOnzbJVUVGNllsVIgSe0JD/Hh0pC+STN4Z19R2LjBJVlwmQX/sh66VlheGB4kmk1RIEi1GM1cVGZnL+5NR9oSGWCYZ2GKt4LsD/fRq6i06SVYswMH15jLPFmsFFaJEr6YykUoyrVjQUysrZByJjvHC8CBD8dh24Mm4poa5SCRZaa2Vlde+7ajl/ckoLwwPclWRkRZjCUZBT8ZQIk6vNsn7k1FcchFbrBUYBYFvBXrp1dQ745q6S8fHJFlpA26ulZXWq4qMVIgGamWFjGgqSa+mcnA8zFA8tgvYHtfUPi4Bkqy02SXDE/dUOCxXFRk5Eh2jV1OZZhT01MoKVxUZyTg4Hmbn2YFwJJW8M66pe0nTMQdJVryABfDwO+1AZ1xTw1xiJFlxATtXFRm9681lXFVkpEKUmPb+ZJT3JqO0j4fDwXhsL/BAXFPDfEzH/0EkWXEBrcA6wMLvdAJdwN64poaZ5X8By0fckYfptTcAAAAASUVORK5CYII="
  },
  {
    "width": 33,
    "height": 98,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 17,
    "height": 49,
    "url": "data:image/png;base64,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"
  },
  {
    "width": 9,
    "height": 25,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAZCAYAAADjRwSLAAAAAklEQVR4AewaftIAAAL5SURBVE3BXWxTVQAH8P8559572mvX9Xa3XefqxG46Vpbuw6lMBTGAjfhAIPgRI0FISGYk8EiCidHEJ6IJMSYmRqM86IMGUIjKGIOAzEKIyxwzc1O7xE3IvqDrdu/NettzPCR92O9HoBze80RfMhY6SgmxpMSKV/LH3zt5/Q1R9mehsP07Mi+3NdV9GjT0mJAIBDgLC4FUbzqRvDIyfQoKbWm0DkrAlMyEGXkIesBCWRCETb6NajqFwhJ2aPPmTdnujkw3NqxvRbDGBiUEvlcwQ0E9/8fU/O/07FD+G8gKhJC4zwxwBHgAlBA8aIdSUOhrzz/W7TpFCGqgKEwYuobi8hL8SqU8ll/IQdHsSHDd9NTYohGsdRrq48m7hWJ5amrSZ5SMD9zM90Nh10Znfj52aC4Ws3I9QqQf4Pp/tKfzwkK8/vbnX57xc1A0qum0IYY3U0nYdwsfg2kgQqDRCuNtAB9BodlnMq9KGbcJAeosIFIDSAkwZiWf6uBboNC9O7MJX/RhraLT7s4V3tU609tNKFRjLF7yy1iLEM0hlJHezrZuKPTPf6YHXW85jzWCnFsL94o/HnjnxHEo7PKNkfzWjcNGwLBf8FYDmFu0MTTirux86+uMFKICRYNy4rt2rbmlBYQQMMbgum64PaPvGxsdPQmFQkk1N7eHQiF4ngfOOaLRKOqidVlUUSiMsQ2o8n2/IqVEuDbcgioKhTrzn+19Lo3dvetHdj2ZyvW92IVbwzePo4pC2bHp8fp1jTF0tD7MGmKWG4/W4oMj+9pQRaEwRn0ofrlScL3VGSgJ22pCFYXy7flf7kCZmZ3/9czA0OmSX8ay486gSoOycWK258bgdZz74vu/I2By8umu8typS12oYp80p78yCHu9dvK2bhI2MeY5S623pvd491Ye2Rqxnx1YXjpLg5S+wikJjnvub4NLi9d+KCycG3aKFzmlPGEY2SbOX2KtZs1qsVLpf//fv/ZPes6EFGI1566cfpSb9XdKpas/Lc5++D9i8iBlalY0tAAAAABJRU5ErkJggg=="
  },
  {
    "width": 5,
    "height": 13,
    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAANCAYAAABhPKSIAAAAAklEQVR4AewaftIAAAETSURBVGPszHCYwMbCnPz33/9vH7/+KGheeGw5E6+gtJeOgR2PpIy6mAAPZxwDEDAJCIq8lJRRZJCSlGZgYmTgZQAClrcvT91+94ZV7/vPF0wsHF+2MgABi73tI0kV2Qt8338xMOhr8Jjm9jAwMH3/lSnMysrA8P+/3I+X7xvEGICA6cPn57s/fOZhePeBhfnT1x+zGYCAZfLGx0949roysLCwsN6/t4GFAQhYeLk5+Y2UxL9ycLD9efvmDT8DELD4mio9NtZW+/Tv//8vCiI8X7Zv28bAdH3RVsbnj58/fvv2w5O3565zMQABi8yXv123O5Zd/P3/30d2JqZaeS7u/QzlMsrBDEDAyMzCWiKtnMsABAAZwmJ74wnYxgAAAABJRU5ErkJggg=="
  }
];
mipmaps.forEach( mipmap => {
  mipmap.img = new Image();
  const unlock = simLauncher.createLock( mipmap.img );
  mipmap.img.onload = unlock;
  mipmap.img.src = mipmap.url; // trigger the loading of the image for its level
  mipmap.canvas = document.createElement( 'canvas' );
  mipmap.canvas.width = mipmap.width;
  mipmap.canvas.height = mipmap.height;
  const context = mipmap.canvas.getContext( '2d' );
  mipmap.updateCanvas = () => {
    if ( mipmap.img.complete && ( typeof mipmap.img.naturalWidth === 'undefined' || mipmap.img.naturalWidth > 0 ) ) {
      context.drawImage( mipmap.img, 0, 0 );
      delete mipmap.updateCanvas;
    }
  };
} );
export default mipmaps;