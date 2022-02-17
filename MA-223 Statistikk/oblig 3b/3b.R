library(extraDistr)

xVals=seq(0,8,0.01)
yValsG=dgamma(xVals,39,36)
yValsGG1=dbetapr(1,39,8,2)
pbetapr(1, 39, 8, 2)
pbetapr(3, 2, 7, 5)

pbetapr(1, 3, 29, 8)
pnbinom(5 ,29, (8/(8+1)))



x <- seq(0, 1, 0.01)
p0 <- dbeta(x, 0.5, 0.5)
p0a <- qbeta(0.05,0.5, 0.5)
p0b <- qbeta(0.95, 0.5, 0.5)
plot(x, p0, type="l", main="Bernoulli beta for gamemaster data, P_0")
abline(v=p0a)
abline(v=p0b)


x <- seq(0, 1, 0.01)
p1 <- dbeta(x, 1.5, 0.5)
p1a <- qbeta(0.05,1.5, 0.5)
p1b <- qbeta(0.95, 1.5, 0.5)
plot(p1~x, type="l", main="Bernoulli beta for gamemaster data, P_1")
abline(v=p1a)
abline(v=p1b)

x <- seq(0, 1, 0.01)
p2 <- dbeta(x, 3.5, 1.5)
p2a <- qbeta(0.05,3.5, 1.5)
p2b <- qbeta(0.95, 3.5, 1.5)
plot(p2~x, type="l", main="Bernoulli beta for gamemaster data, P_2")
abline(v=p2a)
abline(v=p2b)
p2u_x = 3.5/(3.5+1.5)
p2x_mean = qbeta(0.5, 3.5,1.5)
p2x_modus = (3.5-1)/(3.5+1.5-2)

abline(v=p2u_x, col="maroon")
abline(v=p2x_mean, col="darkgreen")
abline(v=p2x_modus, col="blue")


x <- seq(0, 1, 0.01)
p3 <- dbeta(x, 6.5, 8.5)
p3a <- qbeta(0.05,6.5, 8.5)
p3b <- qbeta(0.95, 6.5, 8.5)
plot(p3~x, type="l", main="Bernoulli beta for gamemaster data, P_3")
abline(v=p3a)
abline(v=p3b)

x <- seq(0, 1, 0.01)
p4 <- dbeta(x, 26.5, 18.5)
p4a <- qbeta(0.05,26.5, 18.5)
p4b <- qbeta(0.95, 26.5, 18.5)
plot(p4~x, type="l", main="Bernoulli beta for gamemaster data, P_4")
abline(v=p4a)
abline(v=p4b)

plot(p0~x, type="l", main="Bernoulli beta for gamemaster data, all graphs.", ylim=c(0,10))
lines(p1~x,type="l",col="maroon")
abline(v=p1a)
abline(v=p1b)
lines(p2~x,type="l",col="green")
lines(p3~x,type="l",col="royalblue")
lines(p4~x,type="l",col="grey")

par(mfrow=c(2,3))
plot(x, p0, type="l", main="Bernoulli beta for gamemaster data, P_0")
abline(v=p0a)
abline(v=p0b)
plot(p1~x, type="l", main="Bernoulli beta for gamemaster data, P_1", col="maroon")
abline(v=p1a)
abline(v=p1b)
plot(p2~x, type="l", main="Bernoulli beta for gamemaster data, P_2", col="green")
abline(v=p2a)
abline(v=p2b)
plot(p3~x, type="l", main="Bernoulli beta for gamemaster data, P_3", col="royalblue")
abline(v=p3a)
abline(v=p3b)
plot(p4~x, type="l", main="Bernoulli beta for gamemaster data, P_4", col="grey")
abline(v=p4a)
abline(v=p4b)
plot(p0~x, type="l", main="Bernoulli beta for gamemaster data, all graphs.", ylim=c(0,10))
lines(p1~x,type="l",col="maroon")
lines(p2~x,type="l",col="green")
lines(p3~x,type="l",col="royalblue")
lines(p4~x,type="l",col="grey")
par(mfrow=c(1,1))


x <- seq(0, 1, 0.01)
p2 <- dbeta(x, 3.5, 1.5)
p2a <- qbeta(0.05,3.5, 1.5)
p2b <- qbeta(0.95, 3.5, 1.5)
p2u_x = 3.5/(3.5+1.5)
p2x_mean = qbeta(0.5, 3.5,1.5)
p2x_modus = (3.5-1)/(3.5+1.5-2)


x <- seq(0, 1, 0.01)
p4 <- dbeta(x, 26.5, 18.5)
p4a <- qbeta(0.05,26.5, 18.5)
p4b <- qbeta(0.95, 26.5, 18.5)
p4u_x = 26.5/(26.5+18.5)
p4x_mean = qbeta(0.5, 26.5,18.5)
p4x_modus = (26.5-1)/(26.5+18.5-2)

par(mfrow=c(2,1))
plot(p2~x, type="l", main="Bernoulli beta for gamemaster data, P_2")
abline(v=p2u_x, col="maroon")
abline(v=p2x_mean, col="darkgreen")
abline(v=p2x_modus, col="blue")
abline(v=p2a)
abline(v=p2b)
plot(p4~x, type="l", main="Bernoulli beta for gamemaster data, P_4")
abline(v=p4u_x, col="maroon")
abline(v=p4x_mean, col="darkgreen")
abline(v=p4x_modus, col="blue")
abline(v=p4a)
abline(v=p4b)
par(mfrow=c(1,1))

pbeta(0.5, 1.5, 0.5)
pbeta(0.5, 3.5, 1.5)
pbeta(0.5, 6.5, 8.5)
pbeta(0.5, 26.5, 18.5)

library(discoveries)
alpha = sum (discoveries[1:100])
beta = 100
quintile = 0.4 # 20%
x <- seq( 1 ,6 ,   0.01)
par(mfrow=c(2,3))
p3 <- dgamma (x ,alpha,beta)
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library 20%")
(A=qgamma(quintile, alpha, beta))
(B=qgamma(1-quintile, alpha, beta))
lines(x,p3*(x>=A)*(x<=B),type="h",col="cornsilk")
lines(x,p3,type="l",col="orange",lwd=2)

quintile = 0.3
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library 40%")
(A=qgamma(quintile, alpha, beta))
(B=qgamma(1-quintile, alpha, beta))
lines(x,p3*(x>=A)*(x<=B),type="h",col="cornsilk")
lines(x,p3,type="l",col="orange",lwd=2)

quintile = 0.2
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library 60%")
(A=qgamma(quintile, alpha, beta))
(B=qgamma(1-quintile, alpha, beta))
lines(x,p3*(x>=A)*(x<=B),type="h",col="cornsilk")
lines(x,p3,type="l",col="orange",lwd=2)

quintile = 0.1
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library 80%")
(A=qgamma(quintile, alpha, beta))
(B=qgamma(1-quintile, alpha, beta))
lines(x,p3*(x>=A)*(x<=B),type="h",col="cornsilk")
lines(x,p3,type="l",col="orange",lwd=2)

quintile = 0.05
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library 90%")
(A=qgamma(quintile, alpha, beta))
(B=qgamma(1-quintile, alpha, beta))
lines(x,p3*(x>=A)*(x<=B),type="h",col="cornsilk")
lines(x,p3,type="l",col="orange",lwd=2)

quintile = 0.025
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library 95%")
(A=qgamma(quintile, alpha, beta))
(B=qgamma(1-quintile, alpha, beta))
lines(x,p3*(x>=A)*(x<=B),type="h",col="cornsilk")
lines(x,p3,type="l",col="orange",lwd=2)
par(mfrow=c(1,1))

x <- seq(0,10, 0.1)
p1 <- dgamma(x, 8, 3)
plot(p1~x, type="l", main="Poisson gamma distribution for the discovery library, P1")
p1_expected = sum(discoveries[1:3])/3
p1_median = qgamma(0.5, 8, 3)
p1_modus = (8-1)/3
abline(v=p1_expected, col="maroon")
abline(v=p1_median, col="darkgreen")
abline(v=p1_modus, col="blue")


alpha = sum(discoveries[1:100])
beta = 100
x <- seq( 1 ,6 ,   0.01)
p3 <- dgamma (x ,alpha,beta)
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library")


plotHypothesis <- function(range,limit,distr,lower=TRUE){
  xVars=seq(range[1],range[2],(range[2]-range[1])/10000)
  yVars=distr(xVars)
  plot(xVars,yVars,type="l",col="maroon",ylim=c(0,max(yVars)))
  yVars2=yVars*((xVars<=limit)==lower)
  lines(xVars,yVars2,type="h",col="orange")   
  lines(xVars,yVars,type="l",col="maroon")
}

theDistr = function(x) {
  dgamma(x,sum(discoveries[1:100]),100 )  
}

lower = 1
upper = 6
theLimit = 2.5
plotHypothesis(c(lower,upper),theLimit,theDistr,FALSE)

pgamma(theLimit, alpha, beta) 



