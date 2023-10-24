
import { Actions, createEffect } from '@ngrx/effects';
import { GoogleBooksService } from '../book-list/books.service';
import { Injectable, inject } from "@angular/core";
import { ofType } from '@ngrx/effects/src/actions';
import { BooksApiActions } from './books.actions';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class BooksEffects {
 
  loadBooks$ = createEffect(() =>  
    this.actions$.pipe(
        ofType(BooksApiActions.loadBooks),
        exhaustMap(() => this.booksService$.getBooks()
          .pipe(
              map(books => BooksApiActions.retrievedBookList({books})),
              catchError((error: {message: string}) => 
                of(BooksApiActions.errorLoading({errorMsg: error.message})))
          ))
      ))
    

  constructor(
    private actions$: Actions,
    private booksService$: GoogleBooksService){
    }

}