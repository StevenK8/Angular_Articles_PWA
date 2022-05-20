import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleCacheService } from '../article-cache.service';
import { Article } from '../model/article';
import { Author } from '../model/author';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input()
  article!: Article;
  author : Author = {
    id: 0,
    name: '',
    biography: ''
  };

  isInfo : boolean = false;
    
  @Output()
  deleteArticle : EventEmitter<Article> = new EventEmitter();

  @Output()
  getAuthor : EventEmitter<Author> = new EventEmitter();

  ngOnInit(): void {
    if(this.route.url === '/article/' + this.article.id) {
      this.isInfo = true;
    }else{
      this.isInfo = false;
    }
    this.articleService.getAuthorFromArticle(this.article).subscribe(a => {
      this.author = a;
    });
  }

  constructor(private route: Router, private articleService: ArticleCacheService) { 

  }

  onDelete() {
    this.deleteArticle.emit(this.article);
  }

  // onGetAuthor() {
  //   this.articleService.getAuthorFromArticle(this.article).subscribe(a => {
  //     this.getAuthor.emit(a);
  //   });
  //   // this.getAuthor.emit(this.article);
  // }

  openInfo() {
    // this.ngOnInit();
    this.route.navigate(['/article', this.article.id]);
  }

}
