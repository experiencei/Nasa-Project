const request = require('supertest');
const app = require('../../app');
const { mongoConnect } = require("../../services/mongo")


describe('Launches API ' , () => {{
    beforeAll(() => {
        mongoConnect()
    })

    describe('Test GET /launches' , ()=> {
        test('should respond with 200 Succcess', async () => {
            const response =await request(app)
            .get('/launches')
            .expect("Content-Type" , /json/)
            .expect(200)
        })
        
    });
    
    
    describe('Test POST /launches' , ()=> {
    
        const completeLaunchData = {
            mission : "USS Enteerprise" ,
            rocket : " NCC 1701-D" ,
            target : "Kepler-186 f" ,
            launchDate : "January  4 , 2020"
        }
      const launchDataWithoutDate = {
        mission : "USS Enteerprise" ,
        rocket : " NCC 1701-D" ,
        target : "Kepler-186 f" ,
      }
      const launchDataWithInvalidDate = {
        mission : "USS Enteerprise" ,
        rocket : " NCC 1701-D" ,
        target : "Kepler-186 f" ,
        launchDate : "Jgvai"
      }
        test('should respond with 201 created', async () => {
            const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect("Content-Type" , /json/)
            .expect(201);
    
           const requestDate =new Date(completeLaunchData.launchDate).valueOf();
           const responseDate =new Date(response.body.launchDate).valueOf();
    
           expect(responseDate).toBe(requestDate)
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
    
        test('should catch missing required properties', async () => {
            const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect("Content-Type" , /json/)
            .expect(400);
    
            // expect(response.body).toStrictEqual({
            //     error : "Missing Required Launch Property"
            // });
        })
        test("should catch invalid dates" , async () => {
            const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect("Content-Type" , /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error : "Invalid Launch Date"
            });
        })
    })
    
}})


