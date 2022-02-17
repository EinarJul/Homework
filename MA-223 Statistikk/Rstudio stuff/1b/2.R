library(ggpubr)
library(matlib)
library(datasets)

x<-c(1,2,3,5,6)
y<-c(8,5,7,5,5)
a <- 7.5814
b <- -0.4651
plot(y ~ x,ylim=c(-3,10),col="royalblue")
abline(0,0)
abline(a,b,lwd=2,col="maroon")
segments(x, y, x, a+b*x,col="orange")
text(1,9,label="Residualene",col="orange",adj=c(0,.5))
segments(x, rep(0,5), x, y-(a+b*x),col="purple",lwd=2)
text(2.1,9,label="(satt mot aksen)",col="purple",adj=c(0,.5))
segments(x+0.05, rep(0,5), x+0.05, (a+b*x-y)^2,col="darkgreen",lwd=2)
text(1.5,3.5,label="Kvadratet av residualene",col="darkgreen",adj=c(0,.5))
(SSe<-sum( (y - (a+b*x))^2 ))
text(1.5,2.6,labels = paste("SSe=",SSe),col="darkgreen",adj=c(0,.5))

lm(y~x)


x = c(10.1, 10.5, 10.5, 10.5, 7.1, 7.1, 12.6, 12.6, 5.1, 4.3, 7.4, 7.5, 10.1, 10.1, 8.8, 10.5, 12.1, 8.8, 10.1, 11.4)
y = c(9.5, 7,4, 9.1, 7.8, 8.1, 7.8, 9.1, 8.8, 7.2, 7, 8.6, 6.5, 7.6, 7.2, 7.7, 9.3, 7.4, 7.4, 9.3)
z = c(1, 2, 3, 6, 3, 2, 4, 3, 2, 2, 4, 5, 5, 4, 5, 3, 3, 6, 4, 2)
cor(x, y)
cor(x, z)

lm(y~x)

n=length(x)
(xbar=mean(x))
X <- cbind(rep(1,n),x)
X[,1]
X[,2]
b <- inv(t(X)%*%X)%*%t(X)%*%y
b[1]
b[2]
plot(y~x,col="blue", ylab="distance travelled (cm)", xlab="distance droped from (cm)", main="Scatterplot of height dropped against distance travelled by dice")
abline(b[1], b[2], lwd=2, col="springgreen")
abline(0,0)
segments(x, y, x, b[1]+b[2]*x,col="orange")
text(5,6,label="Residualene",col="orange",adj=c(0,.5))
(SSe<-sum( (y - (b[1]+b[2]*x))^2 ))

# h

# c

n=length(x)
(xbar=mean(x))
X <- cbind(rep(1,n),x)
X[,1]
X[,2]
b <- inv(t(X)%*%X)%*%t(X)%*%z
b[1]
b[2]
plot(z~x,col="blue", ylab="number rolled on dice", xlab="distance droped from (cm)", main="Scatterplot of dice number rolled against height the dice was dropped")
abline(b[1], b[2], lwd=2, col="springgreen")
segments(x, z, x, b[1]+b[2]*x,col="orange")
text(5,6,label="Residualene",col="orange",adj=c(0,.5))
(SSe<-sum( (z - (b[1]+b[2]*x))^2 ))

#4

logN = c(4.467030635, 4.494460719, 4.397453326, 4.416657147, 4.481485626, 4.179293206, 4.240549248, 4.293473048, 4.308180101, 4.157668273, 4.066884743, 4.079543007,3.999826247, 4.042299807, 4.077876404 )
logxrange = c(2.176091259, 2.176091259, 2.176091259, 2.176091259,  2.176091259, 2.243038049, 2.243038049, 2.243038049, 2.243038049, 2.243038049, 2.301029996, 2.301029996, 2.301029996, 2.301029996, 2.301029996)

n=length(logxrange)
(xbar=mean(logxrange))
X <- cbind(rep(1,n),logxrange)
X[,1]
X[,2]
b <- inv(t(X)%*%X)%*%t(X)%*%logN
b[1]
b[2]
length(logN)
length(logxrange)
plot(logN~logxrange)
abline(b[1], b[2], lwd=2, col="springgreen")


cov(logxrange, logN)

cor(logxrange, logN)






#5

help(mtcars)
mycars <- mtcars
mycars$gpm <- -1/mycars$mpg

regression <-lm(mycars$gpm~mycars$hp)

n = length(mycars$hp)
(xbar=mean(mycars$hp))
X <- cbind(rep(1,n), mycars$hp)
b <- inv(t(X)%*%X)%*%t(X)%*%mycars$gpm


plot(mycars$gpm~mycars$hp)
abline(regression)

plot(mycars$gpm~mycars$hp)
abline(b[1], b[2])



# 3 b

x = c(-1, 0, 3, 5)
y = c(3, 5, 9 , 7)

# find the regression coefficient

plot(y~x)

regression <-lm(y~x)

abline(regression)

n = length(x)
(xbar=mean(x))
X <- cbind(rep(1,n), x)
b <- inv(t(X)%*%X)%*%t(X)%*%y
(SSe<-sum( (z - (b[1]+b[2]*x))^2 ))

SSxy<-sum(x*y)-(sum(x)*sum(y))/n
SSxx<-sum(x^2)-(sum(x)^2)/n
covxy <- SSxy/n
covxx <- SSxx/n
rhoxy/rhoxx
b1<-SSxy/SSxx
b1

gammaxy <- SSxy/length(x)

cov(x, y)