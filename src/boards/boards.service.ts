import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';


// Injectable 덕분에 다른 컨트롤러에서도 해당 Service가 사용가능하다
@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    
    getAllBoards(): Board[]{
        return this.boards;
    }

    createBoard(createBoardDto: CreateBoardDto){
        const { title, description }= createBoardDto;

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board);
        return board;
    }

    getBoardById(id: string): Board { 
        const found = this.boards.find((boards) => boards.id === id);

        if(!found){
            throw new NotFoundException(); 
        }

        return found;
    }

    deleteBoard(id:string): void {
        const found = this.getBoardById(id);

        if(!found){
            throw new NotFoundException();
        }else{
            this.boards = this.boards.filter((board) => board.id !== id);
        }
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
