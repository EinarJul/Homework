library(extraDistr)
library(metRology)

# 1


# a
x <- seq(0, 15, 0.1)
y <- dbinom(x, 12, 0.6)
plot(y~x, type="h", col="orange", main="bin(12,0.6) and binnorm(7.2, 1.7)")
ynormal <- dnorm(x,7.2,1.7)
lines(x,ynormal,col="royalblue",type="l")
pnorm(7,7.2,1.7)
pbinom(7, 12, 0.6)

dbinom(0, 4, 0.7)
# b


x=seq(0,1,0.001)
y=dbeta(x,14,19)
ynorm=dnorm(x,0.4242,0.08475)
plot(x,y,col="maroon",type="l", main="beta(14,19), betanorm(0.4242, 0.08475)")
lines(x,ynorm,col="royalblue",type="l")
pnorm(0.4, 0.4242, 0.08475)
pbeta(0.4, 0.4242, 0.08475)


# 2

x=seq(0,8,1)
y=dbbinom(x,8,3,8)
plot(y~x, type="h", col="orange", main="beta binomial distribution(8,3,8)")
pbbinom(5, 8, 3, 8)

# 3

x = seq(0,8,1)
y = dbnbinom(x, 5, 4, 4)
plot(y~x, type="h", col="orange", main="beta negative distribution(5,4,4)")
pbnbinom(7,5,4,4)

# 4

x = seq(0,5,0.01)
y = dbetapr(x, 3,8,4)
plot(y~x, type="l", col="orange", main="Gamma gamma distribution(3,8,4)")
pbetapr(3,4,8,3)

# 5

x = seq(0,5,0.01)
y = df(x, 7, 3)
plot(y~x, type="l", col="orange", main="fisher snedecor distribution(7,3)")
pf(2,7,3)

# 6

x <- seq(0,20, 1)
y <- dbinom(x,,0.73)

# 7

dbinom(2, 5, 0.375)
pbinom(2,5,0.375)
# 8

1- dgamma(16, 314, 20)


# 9

ppois(20, 20.25)

x = seq(0, 20, 1)
y = dpois(x, 7.8)
plot(y~x, type="h", col="orange", main="poisson distribution(7.8)")

# 10


dnorm.scaled()

# 11




# 12




# 13

first <- c(0.05, 0.05, 0.2)
second <- c(0.05, 0.25, 0.05)
third <- c(0.2, 0.05, 0)

df <- data.frame(first, second, third)
cor(df)

# 14




# 15


