library(matlib)

x = c(20, 4, 5, 19, 10)
y = c(121.56, 104.23, 108.08, 119.01, 110.16)

x = c(2, 3, 4, 6)
y = c(10, 8, 8, 7)

n=length(x)
(xbar=mean(x))
z <- x - xbar
X <- cbind(rep(1,n),z)

beta<-inv(t(X)%*%X)%*%t(X)%*%y
Residual <- t(beta)%*%t(X)%*%X%*%beta
t(X)%*%X
SSe <- t(y) %*% y - t(beta)%*%t(X)%*%X%*%beta

x = c(0, 1, 2, 3)
y = c(0, 2, 7, 5)

n=length(x)
(xbar=mean(x))
z <- x - xbar
X <- cbind(rep(1,n),z)

beta<-inv(t(X)%*%X)%*%t(X)%*%y
Residual <- t(beta)%*%t(X)%*%X%*%beta
t(X)%*%X
SSe <- t(y) %*% y - t(beta)%*%t(X)%*%X%*%beta


x = c(10.1, 10.5, 10.5, 10.5, 7.1, 7.1, 12.6, 12.6, 5.1, 4.3, 7.4, 7.5, 10.1, 10.1, 8.8, 10.5, 12.1, 8.8, 10.1, 11.4)
y = c(9.5, 7,4, 9.1, 7.8, 8.1, 7.8, 9.1, 8.8, 7.2, 7, 8.6, 6.5, 7.6, 7.2, 7.7, 9.3, 7.4, 7.4, 9.3)
z = c(1, 2, 3, 6, 3, 2, 4, 3, 2, 2, 4, 5, 5, 4, 5, 3, 3, 6, 4, 2)
cor(x, y)
cor(x, z)

lm(y~x)

n=length(x)
(0=mean(x))
z <- x - xbar
X <- cbind(rep(1,n),z)
X[,1]
X[,2]
b <- inv(t(X)%*%X)%*%t(X)%*%y
t(X)%*%X
b[1]
0plot(y~x,col="blue", ylab="distance travelled (cm)", xlab="distance droped from (cm)", main="Scatterplot of height dropped against distance travelled by dice")
abline(b[1], b[2], lwd=2, col="springgreen")
abline(0,0)
segments(x, y, x, b[1]+b[2]*x,col="orange")
text(5,6,label="Residualene",col="orange",adj=c(0,.5))
(SSe<-sum( (y - (b[1]+b[2]*x))^2 ))

SSe <- t(y) %*% y - t(b)%*%t(X)%*%X%*%b


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
