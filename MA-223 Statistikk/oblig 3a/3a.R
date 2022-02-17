x <- seq(0, 15, 0.1)
y <- dt(x, 12, 0.6)

dt(4000, 3979, 115.36, 7)

x <- 4000
y <- dt.scaled(x,3979,115.36,7)

dt(60, 57.19, 1.172, 9)

dt(60, 57.19, 1.172, 9)



pt.scaled(4000, v1, m1, s1*sqrt(1/k1))


y <- dt.scaled(x,3979,115.36,7)
pt.scaled(4000, 7, 3979, 115.36)
pt.scaled(4000, 7, 3979, 38.456)


pt.scaled(100, 7, 3979, 38.456)

pgamma(100,3.5,41409 )

1 - pt.scaled(50, 24, 49.19, 2.19)


pbeta(0.4, 19, 31)
pnorm(0.4, 0.38, 0.0679)


1 - pbeta(0.1, 20, 154)
1 - pbeta(0.1, 19.5, 153.5)
1 - pbeta(0.1, 19, 153)

x <- seq(0, 1, 0.01)
p0 <- dbeta(x, 0.5, 0.5)
plot(p0~x, type="l", main="Bernoulli beta for gamemaster data, P_0")

x <- seq(0, 1, 0.01)
p1 <- dbeta(x, 1.5, 0.5)
plot(p1~x, type="l", main="Bernoulli beta for gamemaster data, P_1")

x <- seq(0, 1, 0.01)
p2 <- dbeta(x, 3.5, 1.5)
plot(p2~x, type="l", main="Bernoulli beta for gamemaster data, P_2")

x <- seq(0, 1, 0.01)
p3 <- dbeta(x, 6.5, 8.5)
plot(p3~x, type="l", main="Bernoulli beta for gamemaster data, P_3")

x <- seq(0, 1, 0.01)
p4 <- dbeta(x, 26.5, 18.5)
plot(p4~x, type="l", main="Bernoulli beta for gamemaster data, P_4")

plot(p0~x, type="l", main="Bernoulli beta for gamemaster data, all graphs.", ylim=c(0,10))
lines(p1~x,type="l",col="maroon")
lines(p2~x,type="l",col="green")
lines(p3~x,type="l",col="royalblue")
lines(p4~x,type="l",col="grey")

x <- seq(0, 1, 0.01)
p0 <- pbeta(x, 0.5, 0.5)
p1 <- pbeta(x, 1.5, 0.5)
p2 <- pbeta(x, 3.5, 1.5)
p3 <- pbeta(x, 6.5, 8.5)
p4 <- pbeta(x, 26.5, 18.5)
plot(p0~x, type="l", main="Bernoulli beta for gamemaster data, cumulative graphs together", ylim=c(0,1))
lines(p1~x,type="l",col="maroon")
lines(p2~x,type="l",col="green")
lines(p3~x,type="l",col="royalblue")
lines(p4~x,type="l",col="grey")

library(datasets)

k <- 10
hist(discoveries,breaks=k) 

sum(discoveries[1:25])
x <- seq(0,10, 0.1)
p1 <- dgamma(x, sum(discoveries[1:3]), 3)
plot(p1~x, type="l", main="Poisson gamma distribution for the discovery library, P1")

x <- seq(0,6, 0.01)
p2 <- dgamma(x, sum(discoveries[1:25]), 25)
plot(p2~x, type="l", main="Poisson gamma distribution for the discovery library, P2")

x <- seq(2,5, 0.01)
p3 <- dgamma(x, sum(discoveries[1:100]), 100)
plot(p3~x, type="l", main="Poisson gamma distribution for the discovery library, P3")


x <- seq(1,6, 0.01)
p1 <- dgamma(x, sum(discoveries[1:3]), 3)
p2 <- dgamma(x, sum(discoveries[1:25]), 25)
p3 <- dgamma(x, sum(discoveries[1:100]), 100)
plot(p1~x, type="l", main="Poisson gamma distribution for the discovery library, all graphs", ylim=c(0, 2.6))
lines(p2~x,type="l",col="green")
lines(p3~x,type="l",col="royalblue")

dnbinom(5, 310, (100/(100+2)))


bagAData <- c(9.8,10.3,9.4,9.1,10.4,10.0,9.9,8.9,10.6,10.0,9.1,9.5,8.5,9.2, 9.2,10.3,10.9,9.8,10.1,10.6,9.5,10.2,11.5,10.5,10.2,10.0, 9.5, 9.0, 10.1, 9.5)
sum(bagAData)
sum(bagAData)^2
m_1 = sum(bagAData)/length(bagAData)
v_1 = -1 + length(bagAData)
C_1 = sum(bagAData^2)
SS_1 = C_1 - (sum(bagAData)^2 / length(bagAData))
Ssquare = SS_1 / (-1 + length(bagAData))




bagBData <- c(10.8, 11.3,12.3,12.0,11.6,11.9,11.0,10.1,10.4,10.9,10.7,11.5,11.5,13.0,11.2,12.1,10.9,10.3,11.2,11.4,10.7,12.9,12.0,11.9,11.0,11.3,12.2,9.8,11.1,12.7)
sum(bagBData)
sum(bagBData)^2
m_1 = sum(bagBData)/length(bagBData)
v_1 = -1 + length(bagBData)
C_1 = sum(bagBData^2)
SS_1 = C_1 - (sum(bagBData)^2 / length(bagBData))
Ssquare = SS_1 / (v_1)

pgamma(100,3.5,41409 )


