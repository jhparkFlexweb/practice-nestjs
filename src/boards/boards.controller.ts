import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id:string) : Board {
        return this.boardsService.getBoardById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto 
    ): Board{
        return this.boardsService.createBoard(createBoardDto);
    };

    @Delete('/:id')
    deleteBoard(@Param('id') id:string):void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id:string,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ){
        return this.boardsService.updateBoardStatus(id, status);
    }
}

/*
@Controller('boards')
export class BoardsController {
    boardsService: BoardsService;

    constructor(boardsService: BoardsService){
        this.boardsService = boardsService;
    }
}

1. boardsService 파라미터에 BoardsService객체를 타입으로 지정해줍니다.
2. 이 boardsService 파라미터를 BoardsController 클래스 안에서 사용하기 위해서 
this.boardsService 프로퍼티에 boardsService 파라미터를 할당해줍니다.
3. 하지만 타입스크립트에서는 선언한 값만 객체의 프로퍼티로 사용가능하기 때문에 위에 
boardsService:BoardsService로 선언해줍니다.
4. 이렇게 갖게된 boardsService 프로퍼티를 이용해서 BoardsController 클래스 안에서 활용할 수가 있습니다,


constructor(private boardsService:BoardsService){}
접근 제한자를 이용해서 소스 간단하게 하기
접근제한자을 생성자 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됩니다.
*/