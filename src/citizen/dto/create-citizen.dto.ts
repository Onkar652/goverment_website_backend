export class CreateCitizenDto {
    readonly name: string;
  readonly metadata: object;
  readonly file: string; // Path or reference to the stored zip file
  readonly createdAt?: Date;
}
