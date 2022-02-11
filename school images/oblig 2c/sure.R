pnorm(1.5,3.1,0.9)
1-pnorm(5,3.1,0.9)
pnorm(4,3.1,0.9)-pnorm(2,3.1,0.9)

xVals<-seq(0,7,0.01)
yVals<-dnorm(xVals,3.1,0.9)
plot(xVals,yVals,type="l",col="orange")
xVals2<-seq(2,4,0.01)
yVals2<-dnorm(xVals2,3.1,0.9)
lines(xVals2,yVals2,type="h",col="green")
lines(xVals,yVals,type="l",col="orange")


xVals<-seq(0,7,0.01)
yVals<-pnorm(xVals,3.1,0.9)
plot(xVals,yVals,type="l",col="orange")
yVal<-pnorm(2,3.1,0.9)
lines(c(0,2,2),c(yVal,yVal,0),col="maroon")
yVal<-pnorm(4,3.1,0.9)
lines(c(0,4,4),c(yVal,yVal,0),col="maroon")

qnorm(0.05,3.1,0.9)

pnorm(0,0.5,sqrt(1.07))


xVals<-seq(0,7,0.01)
yVals<-dnorm(xVals,3.1,0.9)
plot(xVals,yVals,type="l",col="orange")
#install.packages("metRology")
library(metRology)
yVals2<-dt.scaled(xVals,2,3.1,0.9)
lines(xVals,yVals2,type="l",col="purple")

### Binomisk / Bernoulli

dbinom(3,5,0.6)
pbinom(3,5,0.6)
xVals<-seq(-1,6,1)
yVals<-dbinom(xVals,5,0.6)
plot(xVals,yVals,type="h",lwd=2,col="royalblue",xlim=c(-1,7),ylim=c(0,0.4))
yVals2<-pbinom(xVals,5,0.6)
plot(xVals,yVals2,type="s",lwd=2,col="royalblue",xlim=c(-1,7),ylim=c(0,1.1))

dnbinom(4,3,0.6)
pnbinom(4,3,0.6)
xVals<-seq(-1,20,1)
yVals<-dnbinom(xVals,3,0.6)
plot(xVals,yVals,type="h",lwd=2,col="royalblue",xlim=c(-1,10),ylim=c(0,0.4))
yVals2<-pnbinom(xVals,3,0.6)
plot(xVals,yVals2,type="s",lwd=2,col="royalblue",xlim=c(-1,10),ylim=c(0,1.1))


pbinom(7,10,0.4) - pbinom(2,10,0.4)
1-pnbinom(8,4,0.7)

