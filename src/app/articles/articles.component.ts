import {
  Component,
  OnInit,
} from '@angular/core';
import { ArticleCacheService } from '../article-cache.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles!: Article[];

  articlesFilter?: Article[];

  constructor(private articleService: ArticleCacheService) {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.articlesFilter = articles;
    });
  }

  ngOnInit() {

  }

  delete(article: Article) {
    this.articleService.deleteArticle(article.id).subscribe((a) => {
      this.articles = this.articles.filter((a) => a.id !== article.id);
    });
  }

  getAuthor(article: Article) {
    this.articleService.getArticleByName(article.title).subscribe((a) => {
      // console.log(a);
    });
    // console.log(article);
  }

  public searchArticle(e: Event) {
    const title = (<HTMLInputElement>e.target).value;

    // this.articleService.getArticleByName(title).subscribe(a => {
    //   this.articles = a;
    // });
    this.articlesFilter = this.articles.filter(
      (a) =>
        a.title.toLowerCase().includes(title.toLowerCase()) ||
        a.content.includes(title.toLowerCase())
    );
  }
}
