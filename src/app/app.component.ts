import { Component } from '@angular/core';
import { GraphqlServerService } from './graphql-server.service';
import { Post } from './post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Observable<any>;
  newPost: Post = { id: 4, title: 'New Post', postid: 4, author: 'New' };

  constructor(private dataService: GraphqlServerService) {}

  getPostsGraphql() {
    this.posts = this.dataService
      .getPostsGraphql()
      .pipe(map(({ data }) => data.allPosts));
  }

  addPostGraphql() {
    this.dataService.addPostGraphql(this.newPost).subscribe(
      () => {
        this.getPostsGraphql();
        console.log('Post successful');
      },
      err => console.error(err)
    );
  }

  updatePostGraphql() {
    this.dataService
      .updatePostGraphql({ id: 4, title: 'Updated Post' })
      .subscribe(
        () => {
          this.getPostsGraphql();
          console.log('Put successful');
        },
        err => console.error(err)
      );
  }

  deletePostGraphql() {
    this.dataService.deletePostGraphql(1).subscribe(
      () => {
        this.getPostsGraphql();
        console.log('Delete successful');
      },
      err => console.error(err)
    );
  }
}
