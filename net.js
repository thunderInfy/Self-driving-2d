function weightInitializer(input_neurons, output_neurons){

    let res = [];
    let kaiming_factor = sqrt(2/input_neurons);

    for(let i=0; i<output_neurons; i++){
        let row = [];
        for(let j=0; j<input_neurons; j++){
            row.push(randomGaussian(0, kaiming_factor)); 
        }
        res.push(row);   
    }
    return res;
}

function biasInitializer(neurons){

    let res = [];

    for(let i=0; i<neurons; i++){
        res.push(0);
    }

    return res;
}

function relu(x){
    if(typeof(x)=="object"){
        let res = [];
        for(let i=0; i<x.length; i++){
            res.push(relu(x[i]));
        }
        return res;
    }
    else{
        if(x<0){
            return 0;
        }
        return x;
    }
}

function binarize(x){
    if(typeof(x)=="object"){
        let res = [];
        for(let i=0; i<x.length; i++){
            res.push(binarize(x[i]));
        }
        return res;
    }
    else{
        if(x<0)
            return 0;
        return 1;
    }
}

class Layer{
    constructor(input_neurons, output_neurons){
        this.weight = weightInitializer(input_neurons, output_neurons);
        this.bias = biasInitializer(output_neurons);
    }
    forward(X){
        let y1 = matrixmultiplication(this.weight, X);
        return matrixaddition(y1, this.bias);
    }
    set(layer){
        for(let i=0; i<this.weight.length; i++){
            for(let j=0; j<this.weight[i].length; j++){
                this.weight[i][j] = layer.weight[i][j];
            }
        }
        for(let i=0; i<this.bias.length;i++){
            this.bias[i] = layer.bias[i];
        }
    }
    mutate(){
        for(let i=0; i<this.weight.length; i++){
            for(let j=0; j<this.weight[i].length; j++){
                this.weight[i][j] += randomGaussian(0,mutationParameter);
            }
        }
        for(let i=0; i<this.bias.length;i++){
            this.bias[i] += randomGaussian(0,mutationParameter);
        }
    }
}

class Network{
    constructor(){
        this.layer1 = new Layer(7, 10);
        this.layer2 = new Layer(10, 10);
        this.layer3 = new Layer(10, 10);
        this.layer4 = new Layer(10, 4);
    }
    forward(X){
        let y = relu(this.layer1.forward(X));
        y = relu(this.layer2.forward(y));
        y = relu(this.layer3.forward(y));
        y = this.layer4.forward(y);
        return binarize(y);
    }
    set(network){
        this.layer1.set(network.layer1);
        this.layer2.set(network.layer2);
        this.layer3.set(network.layer3);
        this.layer4.set(network.layer4);
    }
    mutate(){
        this.layer1.mutate();
        this.layer2.mutate();
        this.layer3.mutate();
        this.layer4.mutate();  
    }
}
