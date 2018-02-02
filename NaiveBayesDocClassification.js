/* Naive Bayes Document Classification - Machine Learning Algorithm

http://burakkanber.com/blog/machine-learning-naive-bayes-1/

*/




var tokenize = function (text) {  
    text = text.toLowerCase().replace(/\W/g, ' ').replace(/\s+/g, ' ').trim().split(' ').unique();
    return text;
};