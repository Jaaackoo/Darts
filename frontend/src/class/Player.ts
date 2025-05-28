export class Player {

    private nom: string;
    private darts: number[];
    private score: number;
    private mancheGagne: number;
    private color: string

    constructor(nom: string, color: string) {
        this.nom = nom;
        this.score = 0
        this.mancheGagne = 0;
        this.color = color;
        this.darts = [];
    }

    public getNom(): string {
        return this.nom;
    }


    public getDarts(): number[] {
        return this.darts;
    }

    public getScore(): number {
        return this.score;
    }

    public getMancheGagne(): number {
        return this.mancheGagne;
    }

    public getColor(): string {
        return this.color;
    }

    public setNom(nom: string): void {
        this.nom = nom;
    }

    public updateScore(): void {
        this.score = this.darts.reduce((a, b) => a + b, 0);
    }

    public setMancheGagne(mancheGagne: number): void {
        this.mancheGagne = mancheGagne;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public addDart(value: number) {
        this.darts.push(value);
        this.updateScore();
    }

    public removeDart() {
        this.darts.pop();
        this.updateScore();
    }

    public setScore(score: number) {
        this.score = score;
    }

}
