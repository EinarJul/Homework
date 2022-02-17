library(datasets)
library(ggplot2)
library(roperators)

# A)
bagAFreq <- c(12, 7, 6, 15)
bagAVals <- c("Red", "Green", "Orange", "Yellow")
bagATable <- table(bagAVals)
bagATable[bagAVals] <- bagAFreq

bagBFreq <- c(12, 14, 19)
bagBVals <- c("Red", "Green", "Yellow")
bagBTable <- table(bagBVals)
bagBTable[bagBVals] <- bagBFreq

aFrame <- data.frame(y=c(bagATable))
bFrame <- data.frame(y=c(bagBTable))
aFrame
bFrame
# B)
ggplot(aFrame) + geom_col(aes(x=rownames(aFrame), y=y)) + xlab("Colour") + ylab("Frequency") + ggtitle("Bag A (Laban) contents by colour")
ggplot(bFrame) + geom_col(aes(x=rownames(bFrame), y=y)) + xlab("Colour") + ylab("Frequency") + ggtitle("Bag B (Brynild) contents by colour")

# c)
b <- 0.5
bagAData <- c(9.8,10.3,9.4,9.1,10.4,10.0,9.9,8.9,10.6,10.0,9.1,9.5,8.5,9.2, 9.2,10.3,10.9,9.8,10.1,10.6,9.5,10.2,11.5,10.5,10.2,10.0, 9.5, 9.0, 10.1, 9.5)
bagARangeTable <- seq(range(bagAData)[1], ceiling(range(bagAData)[2]), by=b)
bagARangeTable
bagAData.cut = cut(bagAData, bagARangeTable, right=FALSE)
bagAData.freq = table(bagAData.cut)
bagAData.freq

# d) 

bagAData <- c(9.8,10.3,9.4,9.1,10.4,10.0,9.9,8.9,10.6,10.0,9.1,9.5,8.5,9.2, 9.2,10.3,10.9,9.8,10.1,10.6,9.5,10.2,11.5,10.5,10.2,10.0, 9.5, 9.0, 10.1, 9.5)

# e)

xA<-c(); i=0
for (bagData in bagAData){
  xA[i%+=%1] = bagData
}

# f)

hist(xA, breaks=seq(min(xA)-b/2,max(xA)+b/2,b), xlab = "Length stretched (cm)", ylab = "Frequency", main="Histogram of Bag A's stretched Seigmenn")


# g)
strekklengdeA<-data.frame(lengde=c(8.75, 9.25, 9.75, 10.25, 10.75, 11.25, 11.75),
                          bredde=c(0.5,0.5,0.5,0.5,0.5, 0.5, 0.5),
                          antall=c(2, 6, 7, 10, 4, 0, 1))
strekklengdeA
# h)

strekklengdeA$kumulativt <- ave(strekklengdeA$antall, FUN=cumsum)
strekklengdeA

# i)
plot(strekklengdeA$lengde, strekklengdeA$antall, type = "l", xlab="Length (cm)", ylab="Total", main="Total Seigmenn per length interval (0.5cm)")

# j)

plot(strekklengdeA$lengde, strekklengdeA$kumulativt, type="l", xlab="Length (cm)", ylab="Cumulative total",
     main="Cumulative amount of Seigmenn per length interval (0.5cm)")

# k)

# Manually finding the mean
bagAMean <- sum(bagAData)/length(bagAData)
bagAMean
# Verification by using the built in method
# BagAMean <- mean(bagAData)
# BagAMean

#Function to find the median
#Uses remainder to find whether or not the length of the list is even or not
#When even we need the average between the two numbers in the middle of the list
#When uneven we ceil to the number in the middle of the list
medianFunction <- function(toFind){
  sum <- length(toFind)
  sorted <- sort(toFind)
  
  if (sum %% 2 == 0){
    middle <- sorted[c(floor(sum/2), floor(sum/2)+1)]
    median <- sum(middle)/2
    return(median)
  }
  else {
    return(sorted[ceiling(sum/2)])
  }
}

bagAMedian <- medianFunction(bagAData)
bagAMedian

# bagAMedian <- median(bagAData)
# bagAMedian

# Here we remove all none unique elements for ux
# in the second line we then do a series of calculations
# match functions such that it returns for example between vectors x <- c(1,1,2,3) and y <- (1,3,2), where x appears in y
# as such xy <- match(x, y) would return (1,1,3,2)
# this returns a vector of these values
# however tabulate then removes all redundant data and sums it up giving us a frequency of how often a set of data shows up between the two tables
# which.max() returns where the highest number is positioned in the given table.
# Since 0 is the most frequent data for bag A it is therefore the mode
# This was figured out after seeing the reply to a stack exchange question giving the answer
# https://stackoverflow.com/questions/2547402/how-to-find-the-statistical-mode


modeFunction <- function(x) {
  ux <- unique(x)
  ux[which.max(tabulate(match(x, ux)))]
}

bagAMode <- modeFunction(bagAData)
bagAMode


# l)

plot(strekklengdeA$lengde, strekklengdeA$kumulativt, type="l", xlab="Length (cm)", ylab="Cumulative total", 
     main="Cumulative amount of Seigmenn per length interval (0.5cm) with mean, median and mode")
abline(v=bagAMean, col="maroon", lwd=3)
abline(v=bagAMedian, col="blue", lwd=3)
abline(v=bagAMode, col="red", lwd=3)

# m)

# initial params
ax_i <- bagAData - bagAMean
ax_i <- ax_i^2

# Population standard deviation
standard_population <- sqrt(sum(ax_i)/length(ax_i))
standard_population

# Sample standard deviation
standard_sample <- sqrt(sum(ax_i) / (length(ax_i)-1))
standard_sample

# IQR(bagAData)
qx<-quantile(bagAData)
qx
Aiqr <- qx[4] - qx[2]
Aiqr

# n)
plot(strekklengdeA$lengde, strekklengdeA$kumulativt, type="l", xlab="Length", ylab="Cumulative total", 
     main = "Cumulative amount of Seigmenn per length interval (0.5cm) with population standard deviation")
abline(v=bagAMean, col="maroon", lwd=3)
abline(v=bagAMedian, col="blue", lwd=3)
abline(v=bagAMode, col="red", lwd=3)
abline(v=bagAMean+standard_population, col="dark green", lwd=3)
abline(v=bagAMean+standard_population*2, col="dark green", lwd=3)
abline(v=bagAMean-standard_population, col="dark green", lwd=3)
abline(v=bagAMean-standard_population*2, col="dark green", lwd=3)

plot(strekklengdeA$lengde, strekklengdeA$kumulativt, type="l", xlab="Length", ylab="Cumulative total", 
     main = "Cumulative amount of Seigmenn per length interval (0.5cm) with sample standard deviation")
abline(v=bagAMean, col="maroon", lwd=3)
abline(v=bagAMedian, col="blue", lwd=3)
abline(v=bagAMode, col="red", lwd=3)
abline(v=bagAMean+standard_sample, col="dark green", lwd=3)
abline(v=bagAMean+standard_sample*2, col="dark green", lwd=3)
abline(v=bagAMean-standard_sample, col="dark green", lwd=3)
abline(v=bagAMean-standard_sample*2, col="dark green", lwd=3)

# O ##########################################################################################################################################

# O d)

bagBData <- c(10.8, 11.3,12.3,12.0,11.6,11.9,11.0,10.1,10.4,10.9,10.7,11.5,11.5,13.0,11.2,12.1,10.9,10.3,11.2,11.4,10.7,12.9,12.0,11.9,11.0,11.3,12.2,9.8,11.1,12.7)
range(bagBData)
bagBRangeTable <- seq(floor(range(bagBData)[1]), range(bagBData)[2] + b, by=b)
bagBRangeTable
bagBData.cut = cut(bagBData, bagBRangeTable, right=FALSE)
bagBData.freq = table(bagBData.cut)
bagBData.freq


# O e)

xB<-c(); i=0
for (bagData in bagBData){
  xB[i%+=%1] = bagData
}

# f)

hist(xB, breaks=seq(min(xB)-b/2,max(xB)+b/2,b), xlab = "Length stretched (cm)", ylab = "Frequency", main="Histogram of Bag B's stretched Seigmenn")


# g)
strekklengdeB<-data.frame(lengde=c(9.25, 9.75, 10.25, 10.75, 11.25, 11.75, 12.25, 12.75, 13.25),
                          bredde=c(0.5,0.5,0.5,0.5,0.5,0.5, 0.5, 0.5, 0.5),
                          antall=c(0, 1, 3, 5, 8, 5, 5, 2, 1))
strekklengdeB
# h)

strekklengdeB$kumulativt <- ave(strekklengdeB$antall, FUN=cumsum)
strekklengdeB

# i)
plot(strekklengdeB$lengde, strekklengdeB$antall, type = "l", xlab="Length (cm)", ylab="Total", main="Total Seigmenn per length interval (0.5cm)")

# j)

plot(strekklengdeB$lengde, strekklengdeB$kumulativt, type="l", 
     xlab="Length (cm)", ylab="Cumulative total",
     main="Cumulative amount of Seigmenn per length interval (0.5cm)")

# k)

# Manually finding the mean
bagBMean <- sum(bagBData)/length(bagBData)
bagBMean
# Verification by using the built in method
# BagBMean <- mean(bagBData)
# BagBMean

bagBMedian <- medianFunction(bagBData)
bagBMedian

# bagBMedian <- median(bagBData)
# bagBMedian


bagBMode <- modeFunction(bagBData)
bagBMode


# 

# l)

plot(strekklengdeB$lengde, strekklengdeB$kumulativt, type="l", xlab="Length (cm)", ylab="Cumulative total", 
     main="Cumulative amount of Seigmenn per length interval (0.5cm) with mean, median and mode")
abline(v=bagBMean, col="maroon", lwd=3)
abline(v=bagBMedian, col="blue", lwd=3)
abline(v=bagBMode, col="red", lwd=3)

# m)

# initial params
bx_i <- bagBData - bagBMean
bx_i <- bx_i^2

# Population standard deviation
standard_populationB <- sqrt(sum(bx_i)/length(bx_i))
standard_populationB

# Sample standard deviation
standard_sampleB <- sqrt(sum(bx_i) / (length(bx_i)-1))



# IQR(bagAData)
qx<-quantile(bagBData)
qx
Biqr <- qx[4] - qx[2]
Biqr

# n)
plot(strekklengdeA$lengde, strekklengdeA$kumulativt, type="l", xlab="Length", ylab="Cumulative total", 
     main = "Cumulative amount of Seigmenn per length interval (0.5cm) with population standard deviation")
abline(v=bagBMean, col="maroon", lwd=3)
abline(v=bagBMedian, col="blue", lwd=3)
abline(v=bagBMode, col="red", lwd=3)
abline(v=bagBMean+standard_populationB, col="dark green", lwd=3)
abline(v=bagBMean+standard_populationB*2, col="dark green", lwd=3)
abline(v=bagBMean-standard_populationB, col="dark green", lwd=3)
abline(v=bagBMean-standard_populationB*2, col="dark green", lwd=3)

plot(strekklengdeA$lengde, strekklengdeA$kumulativt, type="l", xlab="Length", ylab="Cumulative total", 
     main = "Cumulative amount of Seigmenn per length interval (0.5cm) with sample standard deviation")
abline(v=bagBMean, col="maroon", lwd=3)
abline(v=bagBMedian, col="blue", lwd=3)
abline(v=bagBMode, col="red", lwd=3)
abline(v=bagBMean+standard_sampleB, col="dark green", lwd=3)
abline(v=bagBMean+standard_sampleB*2, col="dark green", lwd=3)
abline(v=bagBMean-standard_sampleB, col="dark green", lwd=3)
abline(v=bagBMean-standard_sampleB*2, col="dark green", lwd=3)

# o e)





