import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export type RoutineId = bigint;
export interface Routine {
    id: RoutineId;
    isCompleted: boolean;
    scheduledTime: string;
    name: string;
    description: string;
    timestamp: Timestamp;
}
export interface backendInterface {
    addRoutine(name: string, description: string, scheduledTime: string): Promise<RoutineId>;
    deleteRoutine(id: RoutineId): Promise<void>;
    editRoutine(id: RoutineId, name: string, description: string, scheduledTime: string): Promise<void>;
    getAllRoutines(): Promise<Array<Routine>>;
    getRoutine(id: RoutineId): Promise<Routine>;
    markRoutineCompleted(id: RoutineId): Promise<void>;
}
