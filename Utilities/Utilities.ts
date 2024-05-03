import { TestDataType } from "./CustomTypes";
import { readFile, utils } from "xlsx";
import path from 'path';


class Utilities {



    getTestData(type: TestDataType): { category: string, subcategory: string }[] {
        const workbook = readFile(path.resolve(__dirname, '../TestData/AutomationExercise/Excel_TestData.xlsx'));
        const worksheet = workbook.Sheets[type];
        const data: { category: string, subcategory: string }[] = utils.sheet_to_json(worksheet);
        console.log(data);
        return data;
    }
}
export default Utilities;
