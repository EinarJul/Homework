library(metRology)
library(tidyverse) # Sugar and spice, and everything nice!
library(datasets)  # https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/00Index.html
## For oblig 3c
help(mtcars)   # Hva har du slags data?
head(mtcars)   # Se de første radene med data.

## For bruk her:
help(trees)   # Hva har du slags data?
head(trees)   # Se de første radene med data.

# Skal du utføre din egen lineære regresjon, er det bare denne ..
x<-c(1,2,3)      
y<-c(1,3,2)
# Men spar disse til egen bruk. Under tar vi data fra "trees", og du kan gjøre tilsvarende med "mtcars"

# Kovarians og korrelasjon
cov(trees$Girth,trees$Volume) # kovarians. Innebygd funksjon i R. Omkrets vs Volum
cor(trees$Girth,trees$Volume) # korrelasjon. Innebygd funksjon i R. Omkrets vs Volum
cor(trees$Height,trees$Volume) # Høyde vs Volum
plot(trees$Height,trees$Volume,type="p",col="royalblue") # Lavere korrelasjon
plot(trees$Girth,trees$Volume,type="p",xlim=c(5,25),ylim=c(0,90),col="royalblue",xlab="Omkrets",ylab="Volum",main="Trær og deres dimensjoner") # Høyere korrelasjon

x<-trees$Girth       # Skal du utføre din egen lineære regresjon, er det bare denne ..
y<-trees$Volume      # ... og denne du trenger bytte ut. (!!!)
z<-trees$Height      # Til alternative utregninger
n<-length(x)  # Lengdene på x og y er like, så vi plukker bare en av dem. Antall observasjoner.
lmTrees<-lm(y~x)       # Hmm ... Hva er dette?
lmTrees
lmTrees$residuals
sumTrees<-summary(lmTrees)
sumTrees$coefficients           # Jaha ... to tall ... men ... ?
sumTrees$sigma       # Dette er se
a<-sumTrees$coefficients[1]     # a blir satt til det første tallet (den første koeffisienten)
b<-sumTrees$coefficients[2]     # b blir satt til det andre tallet (den andre koeffisienten)
plot(x,y,col="royalblue")
abline(a,b,col="red")        # ÅJA!!! a og b er koeffisientene i regresjonslinja! y = a + bx --- NICE!!

# Eksempel på forelesning
x1=trees$Girth
x2=trees$Height
y=trees$Volume

lmTreesAll=lm(y~x1+x2)
lmTreesAll

# ... regne ut "manuelt" (eller hopp til raskere seksjon, under)
plot(x,y)
xy<-x*y
x
y
xy
Sx<-sum(x)
Sy<-sum(y)
Sxy<-sum(xy)
SSxy<-Sxy-Sx*Sy/n
pCov<-SSxy/n      # Populasjonskovarians
sCov<-SSxy/(n-1)  # Utvalgskovarians
SSx<-sum(x^2)-sum(x)^2/n
pSdx<-sqrt(SSx/n)
sSdx<-sqrt(SSx/(n-1))
SSy<-sum(y^2)-sum(y)^2/n
pSdy<-sqrt(SSy/n)
sSdy<-sqrt(SSy/(n-1))
pCor<-pCov/(pSdx*pSdy)      # Populasjonskorrelasjon
sCor<-sCov/(sSdx*sSdy)      # Utvalgskorrelasjon, altså beste anslag på en større populasjon sin 
# populasjonskorrelasjon ut fra våre data.
pCor # Populasjonskorrelasjon
sCor # Utvalgskorrelasjon. Ser du noe? :-)
tullDat<-data.frame(Petter=x,Janne=y)  # Vi hentet x og y fra en data frame, og nå pakker vi dem inn i en igjen
regDat<-data.frame(x=x,y=y)  # Vi hentet x og y fra en data frame, og nå pakker vi dem inn i en igjen

# Men vi skal regne ut regresjonslinja på "saktemåten" òg, altså for hånd. β = (X^T*X)^{-1}*X^T*y
# y er allerede på plass. Men vi skal lage matrisen X. Vi har ikke lagd matriser før.
x=c(20,22,18,10,15)
y=c(24.5,29,23,15.8,21)
n=length(x)
(xbar=mean(x))
X<-cbind(rep(1,n),x)                   # Erklærer X å være en n x 2 - matrise
X[,1]                                  # 1. kolonne er bare 1-tall
X[,2]                                  # 2. kolonne er x-verdiene
t(X)                                   # Den transponerte av X
t(X) %*% X                             # Matrisemultiplikasjon er t(X) %*% X og ikke som man skulle tro X^T * X
library(matlib)                        # For å kunne bruke inv. Bibliotek-kall kan gjerne samles på toppen.
beta<-inv(t(X)%*%X)%*%t(X)%*%y         # Koeffisientene til regresjonslinjen, etter formelen β = (X^T*X)^{-1}*X^T*y
beta                                   # Tallene vi fikk
plot(x,y,col="royalblue",xlim=c(8,23),ylim=c(10,35))
abline(beta[1],beta[2],col="red")        # ÅJA!!! a og b er koeffisientene i regresjonslinja! y = a + bx --- NICE!!

lmDrop<-lm(y~x)       # Hmm ... Hva er dette?
lmDrop
lmDrop$residuals
sumDrop<-summary(lmDrop)
sumDrop$coefficients           # Jaha ... to tall ... men ... ?
sumDrop$sigma       # Dette er se
a<-sumDrop$coefficients[1]     # a blir satt til det første tallet (den første koeffisienten)
b<-sumDrop$coefficients[2]     # b blir satt til det andre tallet (den andre koeffisienten)
plot(x,y,col="royalblue",xlim=c(8,23),ylim=c(10,35))
abline(a,b,col="red")        # ÅJA!!! a og b er koeffisientene i regresjonslinja! y = a + bx --- NICE!!
segments(x[1],y[1],x[1],a+b*x[1],col="orange") 
for (i in 1:n)                         
{
  segments(x[i],y[i],x[i],a+b*x[i],col="orange")  # For hver x-verdi tegner vi en oransj linje fra punktet til linja. Residualene.
}




sumDat$coefficients                     # Ingen overraskelse: Det er de samme tallene!
plot(x,y,type="p",col="royalblue")     # Plotter igjen. Denne gangen generisk for x og y
abline(beta[1],beta[2],col="red")      # ... og regresjonslinja, som vi nå har regnet ut SJØL !!
segments(x,y,x,a+b*x,col="orange") 

y-(a+b*x)                              # Residualene
sum((y-(a+b*x))^2)                     # Summen av kvadratet av residualene. Dette er SSe.
SSe<-t(y)%*%y-t(beta)%*%t(X)%*%X%*%beta  # Summen av kvadratet av residualene, regnet direkte fra formel. Vi foretrekker denne for å få mindre numerisk feil.
SSe                                    # Nesten likt sum((y-(a+b*x))^2), som forventet. Avviket er numerisk unøyaktighet.
(se<-sqrt(SSe/(n-2)))                  # "Standardfeilen" se. Tenk på det som et gjennomsnittlig avvik mellom punkt og linje, for enkelhets skyld.
sumDat$sigma                           # Samme som se, men de skilles ad av bittelitt numerisk drift underveis i utregningen
sumDat$df[2]                              # Samme som n-2
sumDat$df[2]*sumDat$sigma^2               # Samme som SSe


## Inferens ##
# Prior hyperparametre.
# Nøytrale prior hyperparametre.
nu0<-(-2)    # De settes her til nøytrale verdier. Du kan selv 
SS0<-0       # sette eventuelle informative verdier.

# Informative prior hyperparametre.
sigma0<-1  # Bytt ut 1 med ditt beste gjett på standardavvik sigma
n0<-0      # Hvor mange observasjoner tilsvarer din sikkerhet (bytt ut 0 med det tallet)
nu0<-n0-2  # Her skal du ikke endre noe; dette er utregning ut fra
SS0<-sigma0^2*max(0,nu0) # sigma0 og nu0 som du bestemte over

# Posterior hyperparametre:
# n er allerede på plass
xbar<-sum(x)/n  # 
# beta er allerede gjort
nu1<-nu0+n
SS1<-SS0+SSe
SSx<-sum((x-mean(x))^2)  # Du kan hoppe over denne om du regnet ut SSx over

# Posterior sannsynlighetsfordelinger:
s1<-sqrt(SS1/nu1)
pVals<-c(0.2,0.4,0.6,0.8,0.9,0.95)   # Confidence/credible interval levels
cV<-2^-(0:length(pVals))
colVals<-rgb(0.5*cV,cV,0.5*cV,cV)
xVals<-seq(xbar-3*sSdx,xbar+3*sSdx,sSdx/400)
yVals<-beta[1]+beta[2]*xVals
yLims<-c(min(xVals)-5*s1,max(xVals)+5*s1)
plot(xVals,yVals,col="maroon",type="l",ylim=yLims)
points(x,y,type="p",col="royalblue")
# Her kommer intervallkurvene:
for (i in pVals) {
  for (j in c(-1,1)) {
    p<-0.5*(1+j*i)
    yVals<-qt.scaled(p,nu1,beta[1]+beta[2]*xVals,s1*sqrt(1/n+(xVals-xbar)^2/SSx))
    lines(xVals,yVals,type="l",col=rgb(0,1-0.6*i,(.5+i)/3,1-2*i/3))
  }
}



x<-c(1,2,3,5,6)
y<-c(8,5,7,5,5)
# Prøv forskjellige verdier av a og b, og kjør 
# til og med linjen som gir tekst "SSe="
# med flere forskjellige verdier av a og b
a<-3
b<-1
plot(y ~ x,ylim=c(-1,10),col="royalblue")
abline(0,0)
abline(a,b,lwd=2,col="maroon")
segments(x, y, x, a+b*x,col="orange")
text(1,9,label="Residualene",col="orange",adj=c(0,.5))
segments(x+0.05, rep(0,5), x+0.05, a+b*x-y,col="orange",lwd=2)
text(2.55,9,label="(satt mot aksen)",col="orange",adj=c(0,.5))
segments(x+0.1, rep(0,5), x+0.1, (a+b*x-y)^2,col="darkgreen",lwd=2)
text(1,8.99,label="Residualene (satt mot aksen), kvadrert",col="darkgreen",adj=c(0,.5))
(SSe<-sum( (y - (a+b*x))^2 ))
text(3.3,3.5,labels = paste("SSe=",SSe),col="darkgreen")
# Stopp her, og kjør om igjen med andre verdier av a og b
lm(y~x)



ggplot(data = mpg) + geom_smooth(mapping = aes(x = displ, y = hwy)) + geom_point(mapping = aes(x = displ, y = hwy))

ggplot(data=iris) + geom_point(mapping = aes(x = Sepal.Width, y = Sepal.Length, col=(Species=="setosa"))) 

irisS<-iris[iris$Species=="setosa",]
irisN<-iris[!iris$Species=="setosa",]
mS<-lm(Sepal.Length~Sepal.Width, data = irisS)
mN<-lm(Sepal.Length~Sepal.Width, data = irisN)
ggplot(data=iris) + geom_point(mapping = aes(x = Sepal.Width, y = Sepal.Length, col=(Species=="setosa"))) + geom_abline(intercept=mS$coefficients[1],slope=mS$coefficients[2],col="royalblue") + geom_abline(intercept=mN$coefficients[1],slope=mN$coefficients[2],col="maroon")
ggplot(data=iris) + geom_point(mapping = aes(x = Sepal.Width, y = Sepal.Length, col=(Species=="setosa")))  + geom_smooth(method=lm) 
+ geom_smooth(method=lm,y=mN$coefficients[1],x=mN$coefficients[2],col="maroon")


ggplot(data=iris) + geom_point(mapping = aes(x = Sepal.Width, y = Sepal.Length, col=(Species=="setosa"))) + geom_abline(intercept=mS$coefficients[1],slope=mS$coefficients[2],col="royalblue") 



ggplot(data=iris) + geom_point(mapping = aes(x = Sepal.Width, y = Sepal.Length, col=(Species=="setosa")))  + geom_smooth(method=lm, formula=y~x, mapping = aes(x = Sepal.Width, y = Sepal.Length, col=(Species=="setosa"))) 




ggplot(data=iris) + geom_point(mapping = aes(y = Petal.Length, x = Sepal.Length, col=Species))  + geom_smooth(method=lm, formula=y~x, mapping = aes(y = Petal.Length, x = Sepal.Length, col=Species)) 


mod <- lm(Sepal.Width ~ Petal.Width, data = iris)
