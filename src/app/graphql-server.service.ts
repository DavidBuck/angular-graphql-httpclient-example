import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GraphqlServerService {
  private configUrl = 'http://localhost:3000/graphql';
  private query: string;

  constructor(private http: HttpClient) {}

  getPostsGraphql(): Observable<any> {
    this.query = `
      query {
        allPosts {
          id
          postid
          title
          author
        }
      }`;

    return this.http.post(
      this.configUrl,
      JSON.stringify({ query: this.query }),
      httpOptions
    );
  }

  addPostGraphql(post: Post): Observable<any> {
    this.query = `
    mutation($id: ID!, $postid: Int!, $title: String!, $author: String!) {
      createPost(id: $id, postid: $postid, title: $title, author: $author) {
        id
        postid
        title
        author
      }
    }`;

    return this.http.post(
      this.configUrl,
      JSON.stringify({ query: this.query, variables: post }),
      httpOptions
    );
  }

  updatePostGraphql(updateObj: any): Observable<any> {
    this.query = `
    mutation($id: ID!, $title: String!) {
      updatePost(id: $id, title: $title) {
        id
        postid
        title
        author
      }
    }`;

    return this.http.post(
      this.configUrl,
      JSON.stringify({ query: this.query, variables: updateObj }),
      httpOptions
    );
  }

  deletePostGraphql(deleteId: number): Observable<any> {
    this.query = `
    mutation($id: ID!) {
      removePost(id: $id)
    }`;

    return this.http.post(
      this.configUrl,
      JSON.stringify({ query: this.query, variables: { id: deleteId } }),
      httpOptions
    );
  }
}
