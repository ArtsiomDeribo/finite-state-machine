class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == null){
            throw new Error("Error");
        }

        this.currentState = 'normal';
        this.cash = [];
        this.unded = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state != 'normal' && state != 'busy' && state != 'sleeping' && state != 'hungry'){
            throw new Error("Error");
        } else {
            this.currentState = state;
            this.cash[this.cash.length] = this.currentState;
            this.unded.length = 0;
        }
            
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.currentState == 'normal' && event == 'study') {
            this.currentState = 'busy'
            this.cash.push(this.currentState);
            this.unded.length = 0;
        } else
        if (this.currentState == 'busy' && event == 'get_hungry') {
            this.currentState = 'hungry';
            this.cash.push(this.currentState);
            this.unded.length = 0;
        } else
        if (this.currentState == 'busy' && event == 'get_tired') {
            this.currentState = 'sleeping';
            this.cash.push(this.currentState);
            this.unded.length = 0;
        } else
        if (this.currentState == 'hungry' && event == 'eat') {
            this.currentState = 'normal';
            this.cash.push(this.currentState);
            this.unded.length = 0;
        } else
        if (this.currentState == 'sleeping' && event == 'get_up') {
            this.currentState = 'normal';
            this.cash.push(this.currentState);
            this.unded.length = 0;
        } else
        if (this.currentState == 'sleeping' && event == 'get_hungry') {
            this.currentState = 'hungry';
            this.cash.push(this.currentState);
            this.unded.length = 0;
        } else {
            throw new Error("Error");
        }
    }
    

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = 'normal';
        this.cash.push(this.currentState);
        this.unded.length = 0;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event == null){
            return ['normal', 'busy', 'hungry', 'sleeping'];
        } else if (event == 'get_hungry'){
           return ['busy', 'sleeping'];
        } else if (event == 'get_tired'){
            return ['busy'];
        } else if (event == 'eat'){
            return ['hungry'];
        } else if (event == 'get_up'){
            return ['sleeping'];
        } else if (event == 'get_up'){
            return ['sleeping'];
        } else if (event == 'study'){
            return ['normal'];
        } else {
            return [];
        }
        
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.cash.length == 0){
            return false;
        } else if (this.cash.length == 1){
            this.unded.unshift(this.currentState);
            this.currentState = 'normal';
            this.cash.length = 0;
            return true;
        } else {
            this.unded.unshift(this.currentState);
            this.currentState = this.cash[this.cash.length - 2];
            this.cash.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.unded.length == 0){
            return false;
        } else {
            this.currentState = this.unded.shift();
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.cash.length = 0;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
