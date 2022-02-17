library(extraDistr)
library(metRology)

# 1

# a

x <- seq(0,10, 1)
y <- dbinom(x,8,0.73)
sum(y)
plot(x, y, type="h", col="orange", main = "pdf(x) = bin(8, 0.73)")
dbinom(5, 8, 0.73)
ux = 8*0.73
sigmax = sqrt((8*0.73)*(1-0.73))
medianx= 6
xMax = 8
largestx = medianx

abline(v = ux, col="green")
abline(v=ux+sigmax, col="dark green")
abline(v=ux-sigmax, col="dark green")
abline(v= medianx, col = "blue")
abline(v = largestx, col="blue")
abline(v = xMax, col="cyan")
#b

x <- seq(-1, 29, 1)
y <- dnbinom(x,4,0.55)
sum(y)
plot(x, y, type="h", col="orange", main = "pdf(x) = nb(4, 0.55)")
sum(dnbinom(7,4,0.55))

ux = 4*0.55
sigmax = sqrt((4*0.55)*(1-0.55))
medianx = 3
xMax = 29
xMaximum = 2
abline(v = ux, col="green")
abline(v=ux+sigmax, col="dark green")
abline(v=ux-sigmax, col="dark green")
abline(v= medianx, col = "blue")
abline(v = xMax, col="blue")
abline(v = xMaximum, col="cyan")

#c

xVals=seq(0, 10, 1)
yVals = dpois(xVals,1.7)
sum(yVals)
plot(xVals, yVals, type="h", col="orange", main = ("pdf(x) = pois1.7(x)"))
dpois(6, 1.7)
ux = 1.7
sigmax = sqrt(1.7)
medianx = 1
xMaximum = 1
abline(v = ux, col="green")
abline(v=ux+sigmax, col="dark green")
abline(v=ux-sigmax, col="dark green")
abline(v= medianx, col = "blue")
abline(v = xMaximum, col="cyan")


#d

x <- 2:8
y <- (rep(1/(8 - 2 + 1), 7))
sum(y)
plot(y~x, type="h", main="discrete uniform distribution of a = 2, b = 8")
ux = 8 * (1/7)
sigmax = sqrt((8*(1/7))*(1-(1/7)))
median = NaN
xMax = 8
xMaximum = NaN
abline(v = ux, col="green")
abline(v=ux+sigmax, col="dark green")
abline(v=ux-sigmax, col="dark green")
abline(v= medianx, col = "blue")
abline(v = xMaximum, col="cyan")
# 2

#a

n = 8
p = 0.73

x <- seq(0, 10, 1)
y <- pbinom(x, n, p)
plot(y~x, type="l", main="BIN(8, 0.73), 2 <= x < 6")
Px <- pbinom(5,n,p) - pbinom(2,n,p)
Px
abline(h = Px)

#b

k = 4
p = 0.55

x <- seq(0, 10, 1)
y <- pnbinom(x, k, p)
plot(y~x, type="l", main="NB(4, 0.55), 2 < x <= 7")
Px <- pnbinom(7, k, p) - pnbinom(3, k, p)
Px
abline(h = Px)

#c

lambda = 1.7
xVals=seq(0,8,0.1)
yVals = ppois(xVals, lambda)
plot(xVals, yVals, type="l", main="POIS_1.7(x), 3 < x < 7")
Px <- ppois(6, 1.7) - ppois(2, 1.7)
Px
abline(h = Px)


#d

a = 2
b = 3
c = 5
d = 8

x <- a:d
y <- (cumsum(rep(1/(d - a + 1), 7)))
plot(y~x, type="h", main="discrete cumulative uniform distribution of a = 2, d = 8, 3 <= X < 5")
y



#4

#a

x <- seq(-5, 15, 0.1)
y <- dnorm(x, 5, 3)
plot(y~x, type="l", col="orange")
x2<-seq(2,6,0.01)
y2<-dnorm(x2,5,3)
lines(x2,y2,type="h",col="green", main="Normal distribution (5, 3")
pnorm(6, 5, 3) - pnorm(2, 5 ,3)

#b

x <- seq(-5, 15, 0.1)
y<-dt.scaled(x,5,3,2)
plot(x,y,type="l",col="orange", main="T distribution (5,3,2)")
x2<-seq(2,6,0.01)
y2<-dt.scaled(x2, 5, 3, 2)
lines(x2,y2,type="h",col="green")
pt(6, 5, 3, 2) - pt(2, 5, 3, 2)

#c

x <- seq(0, 6, 0.1)
y <- dgamma(x, 3, 2)
plot(x,y,type="l",col="orange", main="Gamma distribution (3, 2)")
x2<-seq(2,4,0.01)
y2<-dgamma(x2, 3, 2)
lines(x2,y2,type="h",col="green")
pgamma(4, 3, 2) - pgamma(2, 3, 2)

#d

x <- seq(0, 1, 0.01)
y <- dbeta(x, 5, 8)
plot(x,y,type="l",col="orange", main="Beta distribution (5, 8)")
x2<-seq(0.5,1,0.01)
y2<-dbeta(x2, 5, 8)
lines(x2,y2,type="h",col="green")
pbeta(1, 5, 8) - pbeta(0.5, 5, 8)


# 5

# a

x <- seq(-5, 15, 0.1)
y <- pnorm(x, 5, 3)
plot(y~x, type="l",  main="Cumulative normal distribution (5, 3)")
x2<-seq(2,6,0.01)
y2<-pnorm(x2,5,3)
lines(x2,y2,type="h",col="green")
abline(h=(pnorm(6, 5, 3) - pnorm(2, 5 ,3)))


# b

x <- seq(-5, 15, 0.1)
y<-pt.scaled(x,5,3,2)
plot(x,y,type="l",col="orange", main="Cumulative T distribution (5,3,2)")
x2<-seq(2,6,0.01)
y2<-pt.scaled(x2, 5, 3, 2)
lines(x2,y2,type="h",col="green")
abline(h=(pt(6, 5, 3, 2) - pt(2, 5, 3, 2)))

# c

x <- seq(0, 6, 0.1)
y <- pgamma(x, 3, 2)
plot(x,y,type="l",col="orange", main="Cumulative gamma distribution (3, 2)")
x2<-seq(2,4,0.01)
y2<-pgamma(x2, 3, 2)
lines(x2,y2,type="h",col="green")
abline(h=(pgamma(4, 3, 2) - pgamma(2, 3, 2)))

# d


x <- seq(0, 1, 0.01)
y <- pbeta(x, 5, 8)
plot(x,y,type="l",col="orange", main="Cumulative beta distribution (5, 8)")
x2<-seq(0.5,1,0.01)
y2<-pbeta(x2, 5, 8)
lines(x2,y2,type="h",col="green")
abline(h=(pbeta(1, 5, 8) - pbeta(0.5, 5, 8)))



# 6

# a

qnorm(0.95, 5, 3)
qnorm(0.05, 5, 3)

# b

qt(0.95, 5, 3, 2)
qt(0.05, 5, 3, 2)

# c

qgamma(0.95, 3, 2)
qgamma(0.05, 3, 2)

# d

qbeta(0.95, 5, 8)
qbeta(0.05, 5, 8)

# 7

#a

x <- seq(-5, 15, 0.1)
y <- dnorm(x, 5, 3)
plot(y~x, type="l", col="orange")
x2<-seq(2,6,0.01)
expected <- 5
deviancex <- 3
medianx <- expected
xMax <- 15
xMaximum <- expected

abline(v = expected)
abline(v = expected+deviancex, col="blue")
abline(v = expected-deviancex, col="blue")
abline(v = medianx, col="orange")
abline(v = xMax, col="orange")
abline(v = xMaximum, col="purple")



#b

x <- seq(-5, 15, 0.1)
y<-dt.scaled(x,5,3,2)
plot(x,y,type="l",col="orange", main="T distribution (5,3,2)")
expected <- 5
deviancex <- NaN
medianx <- NaN
xMax <- 15
xMaximum <- 3

abline(v = expected)
abline(v = expected+deviancex, col="blue")
abline(v = expected-deviancex, col="blue")
abline(v = medianx, col="orange")
abline(v = xMax, col="orange")
abline(v = xMaximum, col="purple")

#c

x <- seq(0, 6, 0.1)
y <- dgamma(x, 3, 2)
plot(x,y,type="l",col="orange", main="Gamma distribution (3, 2)")
expected <- 3/2
deviancex <- sqrt(3)/2
medianx <- qgamma(0.5, 3, 2)
xMax <- 6
xMaximum <- 1

abline(v = expected)
abline(v = expected+deviancex, col="blue")
abline(v = expected-deviancex, col="blue")
abline(v = medianx, col="orange")
abline(v = xMax, col="orange")
abline(v = xMaximum, col="purple")

#d

x <- seq(0, 1, 0.01)
y <- dbeta(x, 5, 8)
plot(x,y,type="l",col="orange", main="Beta distribution (5, 8)")
expected <- 5/(5+8)
deviancex <- (2*(sqrt(5/7)))/(13)
medianx <- qgamma(0.5, 3, 2)
xMax <- 1
xMaximum <- 0.364

abline(v = expected)
abline(v = expected+deviancex, col="blue")
abline(v = expected-deviancex, col="blue")
abline(v = medianx, col="orange")
abline(v = xMax, col="orange")
abline(v = xMaximum, col="purple")
