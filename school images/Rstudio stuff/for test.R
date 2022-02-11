library(metRology)
library(tidyverse) # Sugar and spice, and everything nice!
library(datasets) 

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


# binomial distribution
# for the distribution
dbinom
# For the cumulative graph
pbinom
#for the percentile
qbinom


# beta distribution
dbeta
# beta binomail distribution
dbbinom 
# beta negative biomial distribution 
dbnbinom 
# gamma gamma distribution 
b e t a p r 