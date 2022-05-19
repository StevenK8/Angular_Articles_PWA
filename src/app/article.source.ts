import { Injectable } from '@angular/core';
import { Article, ArticleCreation } from './model/article';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author, AuthorCreation } from './model/author';

export abstract class ArticleSource {

  abstract preloadAuthors$(): Observable<Author[]>;

  abstract getArticles(): Observable<Article[]>;

  abstract getTop10Articles(): Observable<Article[]> ;

  abstract getArticleByName(name: string): Observable<Article[]> ;

  abstract getSingleArticle(id: number): Observable<Article> ;

  abstract createArticle(article: ArticleCreation): Observable<Article> ;

  abstract createAuthor(author: AuthorCreation): Observable<Author> ;

  abstract getAuthorFromArticle(article: Article): Observable<Author> ;
  
  abstract deleteArticle(id: number): Observable<Article> ;
  
}
