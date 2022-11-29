import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Auth from "./routes/auth";
import { ConfigProvider } from "antd";
import Dashboard from "./routes/dashboard";
import AllCourses from "./routes/course/allCourses";
import NewCourse from "./routes/course/newCourse";
import Profile from "./routes/profile";
import CourseSuccess from "./routes/course/courseSuccess";
import ViewCourse from "./routes/course/viewCourse";
import EditCourse from "./routes/course/editCourse";

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
      children: [
        {
          path: 'courses', 
          children: [
            {
              path: ':courseId',
              element: <ViewCourse />
            },
            {
              path: 'all',
              element: <AllCourses />,  
            },
            {
              path: 'new',
              element: <NewCourse />,
              children: [
                {
                  path: 'success/:courseId',
                  element: <CourseSuccess />
                }
              ]
            },
            {
              path: 'edit',
              children: [
                {
                  path: ':courseId',
                  element: <EditCourse />
                }
              ]
            }
          ]
        },

        {
          path: 'profile',
          element: <Profile />
        }
      ]
    },
    {
      path: '/auth', 
      element: <Auth />
    }
  ]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2728FF',
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
