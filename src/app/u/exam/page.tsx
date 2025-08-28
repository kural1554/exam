import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UserExamPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Exams</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Exams</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You have no upcoming exams scheduled.</p>
                </CardContent>
            </Card>
        </div>
    )
}
