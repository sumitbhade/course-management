class Course {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.instructor = data.instructor;
    this.description = data.description;
    this.enrollmentStatus = data.enrollmentStatus;
    this.thumbnail = data.thumbnail;
    this.duration = data.duration;
    this.schedule = data.schedule;
    this.location = data.location;
    this.prerequisites = data.prerequisites;
    this.syllabus = data.syllabus;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toFirestore() {
    return {
      name: this.name,
      instructor: this.instructor,
      description: this.description,
      enrollmentStatus: this.enrollmentStatus,
      thumbnail: this.thumbnail,
      duration: this.duration,
      schedule: this.schedule,
      location: this.location,
      prerequisites: this.prerequisites,
      syllabus: this.syllabus,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      searchTerms: this.generateSearchTerms(),
    };
  }

  generateSearchTerms() {
    return [
      this.name.toLowerCase(),
      this.instructor.toLowerCase(),
      ...this.prerequisites.map((p) => p.toLowerCase()),
      this.enrollmentStatus.toLowerCase(),
    ];
  }
}

export default Course;
