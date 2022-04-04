import { ArgumentMetadata, BadRequestException,PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any){
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status options`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1
    }

}
/*
    커스텀 파이프로 실제 기능 구현하기
    구현할 기능: 상태(Status)는 PUBLIC과 PRIVATE만 올 수 있기 때문에 이외의 값이 오면 에러를 보내주겠습니다.
*/