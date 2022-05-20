import { Injectable } from '@angular/core';
import { Article, ArticleCreation } from './model/article';
import { map, Observable, of } from 'rxjs';
import { Author, AuthorCreation } from './model/author';
import { ArticleSource } from './article.source';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleCacheService implements ArticleSource {
  constructor(private http: HttpClient) {}

  private articles: Article[] | undefined;
  private authors: Author[] | undefined;

  public preloadArticles$(): Observable<Article[]> {
    if (!this.articles) {
      return this.http
        .get<Article[]>(`${environment.apiUrl}/articles?_sort=date&_order=desc`)
        .pipe(
          map((articles) => {
            this.articles = articles;
            return articles;
          })
        );
    }

    return of(this.articles);
  }

  public preloadAuthors$(): Observable<Author[]> {
    if (!this.authors) {
      return this.http.get<Author[]>(`${environment.apiUrl}/authors`).pipe(
        map((authors) => {
          this.authors = authors;
          return authors;
        })
      );
    }
    return of(this.authors);
  }

  public getArticles(): Observable<Article[]> {
    return this.articles
      ? of(this.articles)
      : this.http.get<Article[]>(`${environment.apiUrl}/articles`);
  }

  public getTop10Articles(): Observable<Article[]> {
    return this.articles
      ? of(this.articles.slice(0, 10))
      : this.http.get<Article[]>(`${environment.apiUrl}/articles?_limit=10`);
  }

  public getArticleByName(name: string): Observable<Article[]> {
    if (this.articles) {
      const articles = this.articles.filter((a) =>
        a.title.toLowerCase().includes(name.toLowerCase())
      );
      return of(articles);
    } else {
      return this.http.get<Article[]>(
        `${environment.apiUrl}/articles?title=${name}`
      );
    }
  }

  public getSingleArticle(id: number): Observable<Article> {
    if (this.articles) {
      const article = this.articles.find((a) => a.id === id);
      if (article) {
        return of(article);
      } else {
        throw new Error('Article not found');
      }
    } else {
      return this.http.get<Article>(`${environment.apiUrl}/articles/${id}`);
    }
  }

  public createArticle(article: ArticleCreation): Observable<Article> {
    if (this.articles) {
      const newArticle = {
        id: this.articles.length + 1,
        title: article.title,
        content: article.content,
        idauthor: article.idauthor,
      };
      this.articles.push(newArticle);
      return of(newArticle);
    } else {
      return this.http.post<Article>(`${environment.apiUrl}/articles`, article);
    }
  }

  public createAuthor(author: AuthorCreation): Observable<Author> {
    if (this.authors) {
      const newAuthor = {
        id: this.authors.length + 1,
        name: author.name,
        biography: author.biography,
      };
      this.authors.push(newAuthor);
      return of(newAuthor);
    } else {
      return this.http.post<Author>(`${environment.apiUrl}/authors`, author);
    }
  }

  public getAuthorFromArticle(article: Article): Observable<Author> {
    if (this.authors) {
      const author = this.authors.find((a) => a.id === article.idauthor);
      if (author) {
        return of(author);
      } else {
        throw new Error('Author not found');
      }
    } else {
      return this.http.get<Author>(
        `${environment.apiUrl}/authors/${article.idauthor}`
      );
    }
  }

  public deleteArticle(id: number): Observable<Article> {
    if (this.articles) {
      this.articles = this.articles.filter((a) => a.id !== id);
    }
    return of();
  }
}
