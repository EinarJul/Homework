library(extraDistr)


x <- seq(0, 1, 0.001)
P1l <- dbeta(x, 32.5, 6.5)
P1mu <- dbeta(x, 18.5, 20.5)

plot(P0~x, type="l", main=)
par(mfrow=c(1,2))
plot(P1l~x, type="l", 
     main="Liverpool beta distribution in the premier league",
     xlab="Values for p",
     ylab="Probability density")
plot(P1mu~x, type="l", 
     main="Manchester United beta distribution in the premier league",
     xlab="Values for p",
     ylab="Probability density")
par(mfrow=c(1,1))

pbeta(0.5, 32.5, 6.5)
pbeta(0.5, 18.5, 20.5)


p1a <- qbeta(0.025,32.5, 6.5)
p1b <- qbeta(0.975, 32.5, 6.5)
p1expected <- (32.5)/(6.5+32.5)
p1mode <- (32.5-1)/(6.5+32.5-2)
p1median <- qbeta(0.5, 32.5, 6.5)
plot(P1l~x, type="l", 
     main="Liverpool interval estimate 95% with mean, mode, expected value, max",
     xlab="Values for p",
     ylab="Probability density")
abline(v=p1a, col="blue")
abline(v=p1b, col="blue")
abline(v=p1expected, col="red")
abline(v=p1mode, col="maroon")
abline(v=p1median, col="maroon")


p1a <- qbeta(0.025,18.5, 20.5)
p1b <- qbeta(0.975, 18.5, 20.5)
p1expected <- (18.5)/(18.5+20.5)
p1mode <- (18.5-1)/(18.5+20.5-2)
p1median <- qbeta(0.5, 18.5, 20.5)
plot(P1mu~x, type="l", 
     main="Manchester United interval estimate 95% with mean, mode, expected value, max",
     xlab="Values for p",
     ylab="Probability density")
abline(v=p1a, col="blue")
abline(v=p1b, col="blue")
abline(v=p1expected, col="red")
abline(v=p1mode, col="maroon")
abline(v=p1median, col="maroon")
