import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { repoUrl } = await request.json();

    if (!repoUrl) {
      return NextResponse.json(
        { error: "Repository URL is required." },
        { status: 400 }
      );
    }

    const match = repoUrl.match(
      /github\.com\/([^/]+)\/([^/#?]+)/
    );

    if (!match) {
      return NextResponse.json(
        { error: "Please enter a valid GitHub repository URL." },
        { status: 400 }
      );
    }

    const owner = match[1];
    const repo = match[2].replace(".git", "");

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Repository not found." },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: "GitHub API request failed." },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      name: data.name,
      fullName: data.full_name,
      description: data.description,
      owner: data.owner.login,
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      url: data.html_url,
      private: data.private,
    });

  } catch (error) {
    console.error("Repository analysis error:", error);

    return NextResponse.json(
      {
        error:
          "Something went wrong while analyzing the repository.",
      },
      { status: 500 }
    );
  }
}