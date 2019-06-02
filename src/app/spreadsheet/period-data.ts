export class PeriodData {
    private employeeId: number;
    private weekNo: number;
    private daysData: DayData[];

    public constructor(employeeId: number, weekNo: number) {
        this.employeeId = employeeId;
        this.weekNo = weekNo;
        this.daysData = [];

        for (let i = 0; i < 14; i++) {
            this.daysData.push(new DayData());
        }
    }

    public getEmployeeId(): number {
        return this.employeeId;
    }

    public getWeekNo(): number {
        return this.weekNo;
    }

    public getDaysData(): DayData[] {
        return this.daysData;
    }
}

export class DayData {
    private description: string;
    private fromHour: string;
    private toHour: string;
    private codesData: Map<number, number>;

    public constructor() {
        this.description = '';
        this.fromHour = '00:00';
        this.toHour = '00:00';
        this.codesData = new Map<number, number>();
        this.codesData.set(Math.ceil(Math.random() * 3) + 3, Math.ceil(Math.random() * 3) / 2);
    }

    public getDescription(): string {
        return this.description;
    }

    public getFromHour(): string {
        return this.fromHour;
    }

    public getToHour(): string {
        return this.toHour;
    }

    public getCodesData(): Map<number, number> {
        return this.codesData;
    }
}