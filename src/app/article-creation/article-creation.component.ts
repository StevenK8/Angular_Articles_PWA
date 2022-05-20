import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleCacheService } from '../article-cache.service';
import { ArticleCreation } from '../model/article';
import { AuthorCreation } from '../model/author';


@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {

  articleForm : FormGroup;

  constructor(private articleService: ArticleCacheService, private fb: FormBuilder, private router: Router) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required ],
      content : ['', Validators.required ],
      name : ['', Validators.required ],
      biography : ['', Validators.required ]
    });
  }

  ngOnInit(): void {
  }

  createArticle() {
    const { title, content, name, biography } = this.articleForm.value;
    const author:AuthorCreation = {name,
      biography};

// Create author and get ID
    this.articleService.createAuthor(author).subscribe(a => {
      const article: ArticleCreation = {
        title,
        content,
        idauthor: a.id
      };
      this.articleService.createArticle(article).subscribe(() => {
        this.router.navigate(['/']);
      });

    }
    );
  }

}
