library(tidyverse) # Sugar and spice, and everything nice!
library(datasets)  # https://stat.ethz.ch/R-manual/R-devel/library/datasets/html/00Index.html
library(plotrix)

# Vi begynner med kategoriske data, altså hvor observasjonene er TYPER:
help(chickwts)   # Dataene er chickwts fra biblioteket datasets. Hva har du slags data i chickwts?
head(chickwts)   # Se de første radene med data.
x<-chickwts$feed # Vi velger ut fôrtypen som våre data
table(x)         # Frekvenstabell over fôrtype 
plot(x)          # Frekvensdiagram over fôrtype
# Vi kan også lage kakediagram. Merk at vi ikke behøver sette argumentene col og main selv.
pie(table(x))
pie(table(x), col=c("blue", "red", "yellow", "pink", "green", "orange","brown"), main="Fôrtyper")
pie3D(table(x))  # eller et 3D kakediagram, for fancy presentasjon. Mer fancy:
pie3D(table(x), theta=pi/4, explode=0.1, labels=names(table(x)))

# Hvordan skriver vi inn egen tabell?
mTable<-table(c("a","b","a","c","a","b","a","c","a","c"))  # Hvis du har en liste over dataene
mTable
# Hvis du allerede har en frekvenstabell, så gjør du slik: (eksempel)
freq<-c(19,12,23)
verdier<-c("katt","hund","ugle")
mTable<-table(verdier)
mTable[verdier]<-freq
mTable
# Hvis du vil plotte, så legger du dataene inn i en dataRamme
library(ggplot2)      # Må påkalles en eller annen gang, men bare én gang, før du bruker ggplot-funksjonen.
mFrame<-data.frame(y=c(mTable)) # Gjør om tabellen til en enkel dataRamme
mFrame
ggplot(mFrame)+ geom_col(aes(x = rownames(mFrame), y = y))


# Men de viktigste dataene for oss er TALL-data:
help(trees)   # Her er dataene trees, også fra datasets. Hva har du slags data?
head(trees)   # Se de første radene med data.
x<-trees$Height  # Høyde (i lengdeenheten feet) er fine tall-data. Vi velger dem.
x
table(x)                  # Frekvenstabell over høyde
plot(table(x),type="h")   # Frekvensdiagram over høyde
hist(x, breaks=6)         # Histogram over høyde, delt opp i cirka 6 grupper.
hist(x, breaks=seq(min(x),max(x),3))         # Histogram over høyde, med grupper på 3 feet.

# Andelsmål
x<-sort(x)       # Setter dataene i stigende rekkefølge
x
median(x)         # Medianen, målingen i midten
qx<-quantile(x,probs=c(0.05,0.25,0.5,0.75,0.95),type=6) # Prosentiler: P5, P25, P50, P75, P95. type=6 er NIST-standarden
qx    # Merk at P50=Q2=median, og P25=Q1=første kvartil og P75=Q1=tredje kvartil
hist(x,breaks=10,col="royalblue")
abline(v=qx,col=c("orangered","orangered","green","orangered","orangered"),lty=c(2,2,1,2,2),lwd=2)
# En populær plott-type for andelsmål er er box-plott
boxplot(x, range=0)  # Det er et litt grovere plott, der den tykke, sorte streken i midten 
# er medianen, mens selve boksen går fra Q1 til Q3, og "T"-ene går mellom "ytterverdier". 
# Du velger hvor ekstreme ytterverdier du vil se på ved å sette range-parameteren. 
# 0 gir de ytterste punktene, mens et positivt tall vil strekke seg ut fra kvartilen
# sin range ganger så langt som avstanden fra medianen til sin kvartil, men ikke lenger ut
# enn det er data. Prøv ut!
boxplot(x, range=0.5)  
boxplot(x, range=1)  
boxplot(x, range=1.5)  
boxplot(x, range=200)  


# Vektemål
nx<-length(x)         # Antall høydemålinger
Sx<-sum(x)            # Summen av høydemålingene
Sx/nx                 # Gjennomsnittlig høyde
mx<-mean(x)           # Gjennomsnittlig høyde regnet med innebygd funksjon i R
mx
x^2                   # Kvadratet av høydene
Sx2<-sum(x^2)         # Summen av kvadratet av høydemålingene
x-mx
sum((x-mx)^2)         # Summen av kvadratiske avvik fra gjennomsnittet
Sx2-Sx^2/nx           # Dette er lik sum((x-mx)^2)
SSx<-Sx2-Sx^2/nx
pVar<-SSx/nx      # Gjennomsnittlig kvadratisk avvik fra gjennomsnittet. Dette kalles populasjonsvarians.
sVar<-SSx/(nx-1)  # Dette kalles utvalgsvarians, og brukes når dataene våre skal anslå varians for en 
# større mengde enn bare dataene selv. Dette er det beste anslaget, når vi deler på (nx-1) heller enn nx.
pSd<-sqrt(pVar)   # Kvadratroten av variansen er standardavviket. Dette er da populasjonsstandardavviket.
sSd<-sqrt(sVar)   # ... og dette er utvalgsstandardavviket.
pSd
sSd
hist(x,breaks=min(x):max(x),col="royalblue") # breaks=min(x):max(x) gir intervallbredder på 1.
abline(v=c(mx,mx-pSd,mx+pSd),col=c("green","palevioletred","palevioletred"),lty=c(1,1,1),lwd=2)
abline(v=c(mx,mx-sSd,mx+sSd),col=c("olivedrab","red","red"),lty=c(1,4,4),lwd=2)

# Alternative histogram: 
hist(x,breaks=seq(min(x),max(x),0.5),col="royalblue") # breaks=seq(min(x),max(x),0.5) gir intervallbredder på 0.5.
hist(x,breaks=seq(min(x),max(x),3),col="royalblue") # breaks=seq(min(x),max(x),3) gir intervallbredder på 3.
hist(x,breaks=7,col="royalblue") # breaks=7 gir omtrent 7 intervaller. Omtrent.

# Vi kan gjenta for andre data. 
help(women)   # Hva har du slags data?
head(women)   # Se de første radene med data.
x<-women$weight
x
# Vi går nå bare opp til linje 8, og regner derfra. Eller vi kan kopiere linje 8--38 og kjøre.

# Eller vi kan legge inn våre egne data i x, og kjøre ...
