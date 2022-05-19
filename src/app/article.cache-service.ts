import { Injectable } from '@angular/core';
import { Article, ArticleCreation } from './model/article';
import { Observable, of } from 'rxjs';
import { Author, AuthorCreation } from './model/author';
import { ArticleSource } from './article.source';

// @Injectable()
export class ArticleCacheService implements ArticleSource {
  constructor(private articles: Article[] = [], private authors: Author[]) {}

  public getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  public getTop10Articles(): Observable<Article[]> {
    return of(this.articles.slice(0, 10));
  }

  public getArticleByName(name: string): Observable<Article[]> {
    const articles = this.articles.filter((a) =>
      a.title.toLowerCase().includes(name.toLowerCase())
    );
    return of(articles);
  }

  public getSingleArticle(id: number): Observable<Article> {
    const article = this.articles.find((a) => a.id === id);
    if (article) {
      return of(article);
    } else {
      throw new Error('Article not found');
    }
  }

  public createArticle(article: ArticleCreation): Observable<Article> {
    const newArticle = {
      id: this.articles.length + 1,
      title: article.title,
      content: article.content,
      idauthor: article.idauthor,
    };
    this.articles.push(newArticle);
    return of(newArticle);
  }

  public createAuthor(author: AuthorCreation): Observable<Author> {
    const newAuthor = {
      id: this.authors.length + 1,
      name: author.name,
      biography: author.biography,
    };
    this.authors.push(newAuthor);
    return of(newAuthor);
  }

  public getAuthorFromArticle(article: Article): Observable<Author> {
    const author = this.authors.find((a) => a.id === article.idauthor);
    if (author) {
      return of(author);
    } else {
      throw new Error('Author not found');
    }
  }

  public deleteArticle(id: number): Observable<Article> {
    this.articles = this.articles.filter((a) => a.id !== id);
    return of();
  }
}
