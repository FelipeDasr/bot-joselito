type funcType = () => Promise<any>;

export class Queue {

    constructor(
        private queue: Array<funcType> = [],
        private queueEmpty = true
    ) {
    }

    public push(func: funcType) {
        this.queue.unshift(func);
        if (this.queueEmpty) {
            this.queueEmpty = false;
            this.execute();
        }
    }

    private async execute() {
        await (this.queue.pop() as funcType)();

        if (!this.queue.length) this.queueEmpty = true;
        else this.execute();
    }
}