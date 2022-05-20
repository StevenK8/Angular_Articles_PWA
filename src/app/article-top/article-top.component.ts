import { Component, OnInit } from '@angular/core';
import { ArticleCacheService } from '../article-cache.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-article-top',
  templateUrl: './article-top.component.html',
  styleUrls: ['./article-top.component.css'],
})
export class ArticleTopComponent implements OnInit {
  articles: Article[] | undefined;

  constructor(private articleService: ArticleCacheService) {}

  ngOnInit(): void {
    this.articleService.getTop10Articles().subscribe((articles) => {
      this.articles = articles;
    });
  }
}
