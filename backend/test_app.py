# https://docs.python.org/3/library/unittest.html
# Tests:
# [X] One test for success behavior of each endpoint
# [ ] One test for error behavior of each endpoint
# [ ] At least two tests of RBAC for each role

import os
from flask import json
import unittest
from app import create_app
from dotenv import load_dotenv
load_dotenv('.env')


class AppTestCase(unittest.TestCase):

    def setUp(self):
        self.cast_assist = os.getenv('CAST_ASSIST')
        self.cast_dir = os.getenv('CAST_DIR')
        self.exec_prod = os.getenv('EXEC_PROD')
        self.header_cast_assit = {'Authorization': 'Bearer ' + self.cast_assist,
                                  'Content-Type': 'application/json'}
        self.header_cast_dir = {'Authorization': 'Bearer ' + self.cast_dir,
                                'Content-Type': 'application/json'}
        self.header_exec_prod = {'Authorization': 'Bearer ' + self.exec_prod,
                                 'Content-Type': 'application/json'}
        self.app = create_app()
        self.client = self.app.test_client

    def tearDown(self):
        pass

    def test_get_movies_not_logged_in(self):
        res = self.client().get("/movies")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertTrue(data["code"])
        self.assertTrue(data["description"])

    def test_get_actors_not_logged_in(self):
        res = self.client().get("/actors")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertTrue(data["code"])
        self.assertTrue(data["description"])

    def test_get_movie_details_not_logged_in(self):
        res = self.client().get("/movies/3")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertTrue(data["code"])
        self.assertTrue(data["description"])

    def test_get_actor_details_not_logged_in(self):
        res = self.client().get("/actors/2")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertTrue(data["code"])
        self.assertTrue(data["description"])

    def test_get_movies_as_CAST_ASSIST(self):
        res = self.client().get("/movies", headers=self.header_cast_assit)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["movies"])

    def test_get_actors_as_CAST_ASSIST(self):
        res = self.client().get("/actors", headers=self.header_cast_assit)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["actors"])

    def test_get_misspelled_endpoint(self):
        res = self.client().get("/test")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertFalse(data["success"])
        self.assertEqual(data["error"], 404)
        self.assertEqual(data["message"], "resource not found")

    def test_get_movie_details_as_CAST_ASSIST(self):
        res = self.client().get("/movies/3", headers=self.header_cast_assit)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["movies"])

    def test_get_actor_details_as_CAST_ASSIST(self):
        res = self.client().get("/actors/1", headers=self.header_cast_assit)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["actors"])

    def test_get_movie_details_error_as_CAST_ASSIST(self):
        res = self.client().get("/movies/999", headers=self.header_cast_assit)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertFalse(data["success"])
        self.assertEqual(data["message"], "bad request")

    def test_get_actor_details_error_as_CAST_ASSIST(self):
        res = self.client().get("/actors/999", headers=self.header_cast_assit)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertFalse(data["success"])
        self.assertEqual(data["message"], "bad request")

    def test_post_movie_as_EXEC_PROD(self):
        data = {'title': 'Fantastic Four', 'release_date': '8/4/2015'}
        res = self.client().post("/movies", data=json.dumps(data),
                                 headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["movies"])

    def test_post_actor_as_EXEC_PROD(self):
        data = {"name": "Gary Oldman", "age": 56,
                "gender": "male", "movie_id": 1}
        res = self.client().post("/actors", data=json.dumps(data),
                                 headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["actors"])

    def test_update_movie_as_EXEC_PROD(self):
        data = {"title": "The Other Guys", "release_date": "8/2/2010"}
        res = self.client().patch("/movies/3", data=json.dumps(data),
                                  headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["movies"])

    def test_update_actor_as_EXEC_PROD(self):
        data = {"name": "Jim Carrey", "age": 58,
                "gender": "male", "movie_id": 1}
        res = self.client().patch("/actors/4", data=json.dumps(data),
                                  headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["actors"])

    def test_add_actor_by_movie_as_EXEC_PROD(self):
        data = {"name": "Jim Carrey", "age": 58,
                "gender": "male", "movie_id": 1}
        res = self.client().post("/actors/4/movie", data=json.dumps(data),
                                 headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["actors"])
        self.assertTrue(data["actors"][0]["movie"])

    def test_delete_movie_as_EXEC_PROD(self):
        res = self.client().delete("/movies/2", headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["delete"])

    def test_delete_actor_as_EXEC_PROD(self):
        res = self.client().delete("/actors/2", headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])
        self.assertTrue(data["delete"])

    def test_delete_movie_error_as_EXEC_PROD(self):
        res = self.client().delete("/movies/2", headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertFalse(data["success"])
        self.assertEqual(data["message"], "bad request")

    def test_delete_actor_error_as_EXEC_PROD(self):
        res = self.client().delete("/actors/2", headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertFalse(data["success"])
        self.assertEqual(data["message"], "bad request")

    def test_update_movie_error_as_EXEC_PROD(self):
        data = {"title": "The Other Guys", "release_date": 34}
        res = self.client().patch("/movies/3", data=json.dumps(data),
                                  headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertFalse(data["success"])
        self.assertEqual(data["message"], "bad request")

    def test_update_actor_error_as_EXEC_PROD(self):
        data = {"name": "Jim Carrey"}
        res = self.client().patch("/actors/5", data=json.dumps(data),
                                  headers=self.header_exec_prod)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 400)
        self.assertFalse(data["success"])
        self.assertEqual(data["message"], "bad request")


if __name__ == '__main__':
    unittest.main()
