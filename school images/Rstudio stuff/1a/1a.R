library(datasets)

hist(treering,breaks=50,col="darkcyan")

m <- mean(treering)

abline(v=m, col="maroon",lwd=3)

s <- sd(treering)

abline(v=m+s, col="blue", lwd=3)
abline(v=m+2*s, col="blue", lwd=3)
abline(v=m+3*s, col="blue", lwd=3)
abline(v=m-s, col="blue", lwd=3)
abline(v=m-2*s, col="blue", lwd=3)
abline(v=m-3*s, col="blue", lwd=3)

tR <- sort(treering)

plot(1:length(tR),tR, type="l")

plot(tR, 1:length(tR), type="l")

plot(tR, (1:length(tR))/length(tR),type="l")

lines(x=c(0,quantile(tR,0.75)),y=rep(0.75,2),col="darkorange")
lines(x=rep(quantile(tR,0.75),2),y=c(0,0.75),col="darkorange")

quantile(tR, c(.25, .50, .75))

lines(x=c(0,quantile(tR,0.25)),y=rep(0.25,2),col="darkorange")
lines(x=rep(quantile(tR,0.25),2),y=c(0,0.25),col="darkorange")

lines(x=c(0,quantile(tR,0.50)),y=rep(0.50,2),col="darkorange")
lines(x=rep(quantile(tR,0.50),2),y=c(0,0.50),col="darkorange")

quantile(tR, c(.25, .50, .75))


boxplot(treering)