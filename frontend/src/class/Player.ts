export class Player {

    private nom: string;
    private score: number;
    private mancheGagne: number;
    private color: string

    constructor(nom: string, color: string) {
        this.nom = nom;
        this.score = 0;
        this.mancheGagne = 0;
        this.color = color;
    }

    public getNom(): string {
        return this.nom;
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

    public setScore(score: number): void {
        this.score = score;
    }

    public setMancheGagne(mancheGagne: number): void {
        this.mancheGagne = mancheGagne;
    }

    public setColor(color: string): void {
        this.color = color;
    }
}
