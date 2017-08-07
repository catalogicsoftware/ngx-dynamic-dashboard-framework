/**
 * Created by jayhamilton on 6/22/17.
 */
export class ErrorObject {
    detail: string;
    summary: string;
    solutions: SolutionObject[];
    constructor(detail: string, summary: string, solutions: SolutionObject[]) {
        this.detail = detail;
        this.summary = summary;
        this.solutions = solutions;
    }
};

export class SolutionObject{
    summary: string;
    articleId: number;
    link: string;
    constructor(summary, articleId, link){
        this.summary = summary;
        this.articleId = articleId;
        this.link = link;
    }
}