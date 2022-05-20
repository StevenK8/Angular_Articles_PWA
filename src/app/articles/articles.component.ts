import { Component, OnInit } from '@angular/core';
import { ArticleCacheService } from '../article-cache.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] | undefined;

  articlesFilter?: Article[];

  constructor(private articleService: ArticleCacheService) {
    this.articleService.getArticles().subscribe((articles) => {
      this.articles = articles;
      this.articlesFilter = articles;
    });
  }

  ngOnInit(): void {}
  delete(article: Article) {
    if (this.articles) {
      this.articleService.deleteArticle(article.id).subscribe(() => {
        if (this.articles) {
          this.articles = this.articles.filter((a) => a.id !== article.id);
        }
      });
    }
  }

  public searchArticle(e: Event) {
    if (this.articles) {
      const title = (<HTMLInputElement>e.target).value;
      this.articlesFilter = this.articles.filter(
        (a) =>
          a.title.toLowerCase().includes(title.toLowerCase()) ||
          a.content.includes(title.toLowerCase())
      );
    }
  }
}
