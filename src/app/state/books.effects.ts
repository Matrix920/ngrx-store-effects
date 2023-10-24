
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GoogleBooksService } from '../book-list/books.service';
import { Injectable } from "@angular/core";
import { BooksApiActions } from './books.actions';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
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
    
  displayErrorAlert$ = createEffect(() => 
    this.actions$.pipe(
      ofType(BooksApiActions.errorLoading),
      tap(({errorMsg}) => console.log(errorMsg))
    )
  )

  constructor(
    private actions$: Actions,
    private booksService$: GoogleBooksService){
    }

}