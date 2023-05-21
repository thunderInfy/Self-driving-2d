let population = 25;
let mutationParameter = 4e-2;
let mutationChance = 1;
let chooseFittest = 1;
let randomInit = 0.2;

class Evolution{
    constructor(){
        this.pop =  [];   
        this.fitness = [];
        this.maxfitvals = [];
        this.generation = 0;
    }
    startLife(){
        for(let i=0; i<population; i++){
            this.pop.push(new Car());
        }
        this.resetFitness();
    }
    resetFitness(){
        this.fitness = [];
        for(let i=0; i<population; i++){
            this.fitness.push(0);
        }
    }

    selectRandom(probs){

        let num = random();

        for(let i=0; i<probs.length; i++){
            if(num < probs[i]){
                return i;
            }
        }
    }
    select(){
        let probs = [];
        let total_fitness = 0;
        
        let maximum = -1;
        this.mostfit = null;

        for(let i=0; i<this.fitness.length; i++){
            total_fitness += this.fitness[i];
            if(maximum < this.fitness[i]){
                maximum = this.fitness[i];
                this.mostfit = i;
            }
        }

        this.maxfitvals.push(maximum);
        // print(JSON.stringify(this.maxfitvals));

        for(let i of this.fitness){
            probs.push(exp(i/total_fitness));
        }

        let den = probs.reduce((a,b)=>a+b, 0);

        for(let i=0; i<probs.length; i++){
            probs[i] /= den;
        }

        for(let i=1; i<probs.length; i++){
            probs[i] += probs[i-1];
        }

        let newpop = [];
        this.generation += 1;

        print("A:"+this.pop[this.mostfit].fitness);

        newpop.push(clone(this.pop[this.mostfit]));

        for(let i=1; i<population; i++){
            let s = this.selectRandom(probs);

            if(random() < chooseFittest){
                s = this.mostfit;
                newpop.push(clone(this.pop[s]));
            }
            else if(random() < randomInit)
                newpop.push(new Car());
            else
                newpop.push(clone(this.pop[s]));
        }

        this.pop = [];
        for(let i=0; i<population; i++){
            this.pop.push(newpop[i]);
        }
    }
    mutateGeneration(){
        for(let i=1; i<population; i++){
            if(random() < mutationChance)
                this.pop[i].network.mutate();
        }
    }
    updateFitness(){
        let changed = false;
        for(let i=0; i<population; i++){
            if(this.fitness[i] != this.pop[i].fitness){
                changed = true;
                this.fitness[i] = this.pop[i].fitness;
            }
        }
        return changed;
    }
}
