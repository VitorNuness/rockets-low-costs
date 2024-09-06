import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

export type LaunchDocument = HydratedDocument<Launch>;

class Rocket {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  image: string;
}

class Mission {
  @Prop({ required: true })
  missionId: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  year: string;
}

@Schema()
export class Launch {
  @Prop({ type: Rocket, required: true })
  rocket: Rocket;

  @Prop({ type: Mission, required: true })
  mission: Mission;

  @Prop()
  profit: number | null;

  @Prop()
  total: number | null;

  @Prop({ required: true })
  date: Date;

  @Prop()
  status: boolean;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: ObjectId;
}

export const LaunchSchema = SchemaFactory.createForClass(Launch);
