import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UserCoursePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Courses</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You are not currently enrolled in any courses.</p>
                </CardContent>
            </Card>
        </div>
    )
}
