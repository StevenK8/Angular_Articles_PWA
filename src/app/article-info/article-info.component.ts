import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleCacheService } from '../article-cache.service';
import { Article } from '../model/article';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.css'],
})
export class ArticleInfoComponent implements OnInit {
  @Input()
  articles!: Article[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleCacheService
  ) {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '-1');
    if (id !== -1) {
      this.articleService.getSingleArticle(id).subscribe((a) => {
        this.articles = [a];
      });
    } else {
      this.router.navigate(['#']);
    }
  }

  ngOnInit(): void {}

  delete(article: Article) {
    this.articleService.deleteArticle(article.id).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
